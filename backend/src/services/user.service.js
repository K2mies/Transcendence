import { prisma } from "../config/db.js";

export async function deleteUser(userId) {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}

export async function myFriends(myId) {
  const relations = await prisma.userUserRelation.findMany({
    where: {
      friendStatus: "FRIENDS",
      OR: [{ senderId: myId }, { receiverId: myId }],
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const friends = relations.map((relation) =>
    relation.senderId === myId ? relation.receiver : relation.sender,
  );

  return friends;
}

export async function allUsers(search) {
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
    },
    take: 20,
  });

  return users;
}
