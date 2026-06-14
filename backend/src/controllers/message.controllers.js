import {prisma} from "../config/db.js";

const getMessages = async (req, res) => {
	const me = req.user.id;
	const other = Number(req.params.userId);

	if (!Number.isInteger(other) || other <= 0) {
		return res.status(400).json({error: "Invalid userId"})
	}

	const friendship = await prisma.userUserRelation.findFirst({
		where: {
			friendStatus: "FRIENDS",
			OR: [
				{ senderId: me, receiverId: other },
				{ senderId: other, receiverId: me },
			],
		},
	});

	if (!friendship) {
		return res.status(403).json({
			error: "You are not friends with this user",
		});
	}

	const messages = await prisma.message.findMany({
		where: {
			OR: [
				{
					senderId: me,
					receiverId: other,
				},
				{
					senderId: other,
					receiverId: me,
				},
			],
		},
		orderBy: {
			createdAt: "asc",
		},
	});
	res.json(messages);
};
const getConversations = async (req, res) => {
	const userId = req.user.id;

	if (!req.user) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	// 1. Get FRIENDS ONLY
	const relations = await prisma.userUserRelation.findMany({
		where: {
			friendStatus: "FRIENDS",
			OR: [
				{ senderId: userId },
				{ receiverId: userId },
			],
		},
		include: {
			sender: { select: { id: true, name: true } },
			receiver: { select: { id: true, name: true } },
		},
	});

	// 2. Build friend set (FAST lookup)
	const friendIds = new Set(
		relations.map(r =>
			r.senderId === userId ? r.receiverId : r.senderId
		)
	);

	// 3. Get all messages involving user
	const messages = await prisma.message.findMany({
		where: {
			OR: [
				{ senderId: userId },
				{ receiverId: userId },
			],
		},
		orderBy: {
			createdAt: "desc",
		},
		include: {
			sender: { select: { id: true, name: true } },
			receiver: { select: { id: true, name: true } },
		},
	});

	const map = new Map();

	for (const msg of messages) {
		const otherUser =
			msg.senderId === userId
				? msg.receiver
				: msg.sender;

		// ONLY FRIENDS!
		if (!friendIds.has(otherUser.id)) continue;

		if (!map.has(otherUser.id)) {
			map.set(otherUser.id, {
				userId: otherUser.id,
				name: otherUser.name,
				lastMessage: msg.content,
				lastMessageAt: msg.createdAt,
				unreadCount: 0,
			});
		}

		// unread logic (only incoming messages)
		if (msg.receiverId === userId && msg.read === false) {
			map.get(otherUser.id).unreadCount += 1;
		}
	}

	return res.json(Array.from(map.values()));
};

export {getMessages, getConversations};