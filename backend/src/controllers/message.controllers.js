import {prisma} from "../config/db.js";

const getMessages = async (req, res) => {
	const currentUserId = req.user.id;
	const otherUserId = Number(req.params.userId);

	const messages = await prisma.message.findMany({
		where: {
			OR: [
				{
					senderId: currentUserId,
					receiverId: otherUserId,
				},
				{
					senderId: otherUserId,
					receiverId: currentUserId,
				},
			],
		},
		orderBy: {
			createdAt: "asc",
		},
	});
	res.json(messages);
};

export {getMessages};