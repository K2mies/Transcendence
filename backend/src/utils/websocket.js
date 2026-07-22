import { prisma } from "../config/db.js";
import { connectedUsers } from "../websocket/websocket.server.js";
import { WebSocket } from "ws";

export async function sendOnlineFriends(userId) {
  const socket = connectedUsers.get(userId);
  if (!socket) return;

  const friends = await prisma.userUserRelation.findMany({
    where: {
      friendStatus: "FRIENDS",
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
  });

  const onlineFriends = friends
    .map((friend) =>
      friend.senderId === userId ? friend.receiverId : friend.senderId,
    )
    .filter((friendId) => connectedUsers.has(friendId));

  if (socket.readyState !== WebSocket.OPEN) return;

  socket.send(
    JSON.stringify({
      type: "online-users",
      users: onlineFriends,
    }),
  );
}

export function sendNotification(receiverId, payload) {
  const socket = connectedUsers.get(receiverId);

  if (!socket) return;

  if (socket.readyState !== WebSocket.OPEN) return;

  socket.send(JSON.stringify(payload));
}

export async function sendUsernameUpdate(userId, newName) {
  const friends = await prisma.userUserRelation.findMany({
    where: {
      friendStatus: "FRIENDS",
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
  });

  for (const friend of friends) {
    const friendId =
      friend.senderId === userId ? friend.receiverId : friend.senderId;

    console.log(`Sending username update to friend ${friendId}: ${newName}`); //temp delete

    sendNotification(friendId, {
      type: "username-changed",
      userId,
      newName,
    });
  }
}
