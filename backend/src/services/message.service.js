import { prisma } from "../config/db.js";

export async function getMessages(myId, otherId) {
  if (!Number.isInteger(otherId) || otherId <= 0) {
    const error = new Error("Invalid userId");
    error.status = 400;
    throw error;
  }

  const friendship = await prisma.userUserRelation.findFirst({
    where: {
      friendStatus: "FRIENDS",
      OR: [
        { senderId: myId, receiverId: otherId },
        { senderId: otherId, receiverId: myId },
      ],
    },
  });

  if (!friendship) {
    const error = new Error("You are not friends with this user");
    error.status = 403;
    throw error;
  }

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        {
          senderId: myId,
          receiverId: otherId,
        },
        {
          senderId: otherId,
          receiverId: myId,
        },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return messages;
}

export async function getConversations(userId) {
  // 1. Get FRIENDS ONLY
  const relations = await prisma.userUserRelation.findMany({
    where: {
      friendStatus: "FRIENDS",
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    include: {
      sender: { select: { id: true, name: true } },
      receiver: { select: { id: true, name: true } },
    },
  });

  // 2. Build friend set (FAST lookup)
  const friendIds = new Set(
    relations.map((r) => (r.senderId === userId ? r.receiverId : r.senderId)),
  );

  // 3. Get all messages involving user
  const messages = await prisma.message.findMany({
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

  const map = new Map();

  for (const msg of messages) {
    const otherUser = msg.senderId === userId ? msg.receiver : msg.sender;

    if (!map.has(otherUser.id)) {
      map.set(otherUser.id, {
        userId: otherUser.id,
        name: otherUser.name,
        lastMessage: msg.content,
        lastMessageAt: msg.createdAt,
        unreadCount: 0,
        canChat: friendIds.has(otherUser.id),
      });
    }

    // unread logic (only incoming messages)
    if (msg.receiverId === userId && msg.read === false) {
      map.get(otherUser.id).unreadCount += 1;
    }
  }

  return Array.from(map.values());
}

export async function postRead(myId, otherId) {
  if (!Number.isInteger(otherId) || otherId <= 0) {
    const error = new Error("Invalid userId");
    error.status = 400;
    throw error;
  }

  await prisma.message.updateMany({
    where: {
      senderId: otherId,
      receiverId: myId,
      read: false,
    },
    data: {
      read: true,
    },
  });
}
