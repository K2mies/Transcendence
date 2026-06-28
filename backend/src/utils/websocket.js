import { prisma } from "../config/db.js";
import { connectedUsers } from "../websocket/websocket.server.js";
import { WebSocket } from "ws";

export async function sendOnlineFriends(userId) {
	const socket = connectedUsers.get(userId);
	if (!socket) return;

	const friends = await prisma.userUserRelation.findMany({
		where: {
			friendStatus: "FRIENDS",
			OR: [
				{ senderId: userId },
				{ receiverId: userId },
			],
		},
	});

	const onlineFriends = friends
		.map(friend =>
			friend.senderId === userId
				? friend.receiverId
				: friend.senderId
		)
		.filter(friendId => connectedUsers.has(friendId));

	socket.send(JSON.stringify({
		type: "online-users",
		users: onlineFriends,
	}));
}
