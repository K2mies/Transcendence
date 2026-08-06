import { prisma } from "../config/db.js";

export async function checkFriendship(me, other) {
	return await prisma.userUserRelation.findFirst({
		where: {
		friendStatus: "FRIENDS",
		OR: [
			{ senderId: me, receiverId: other },
			{ senderId: other, receiverId: me },
		],
		},
	});
}

export async function getMessages(me, other) {
	return await prisma.message.findMany({
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
}

export async function getFriends(userId) {
	return await prisma.userUserRelation.findMany({
		where: {
			friendStatus: "FRIENDS",
			OR: [{ senderId: userId }, { receiverId: userId }],
		},
		include: {
			sender: { select: { id: true, name: true } },
			receiver: { select: { id: true, name: true } },
		},
	});
}

export async function getUserMessages(userId) {
	return await prisma.message.findMany({
		where: {
			OR: [{ senderId: userId }, { receiverId: userId }],
		},
		orderBy: {
			createdAt: "desc",
		},
		include: {
			sender: { select: { id: true, name: true } },
			receiver: { select: { id: true, name: true } },
		},
	});
}

export async function markRead(otherUserId, me) {
	return await prisma.message.updateMany({
		where: {
			senderId: otherUserId,
			receiverId: me,
			read: false,
		},
		data: {
			read: true,
		},
	});
}