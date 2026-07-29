import { prisma } from "../config/db.js";
import { sendOnlineFriends, sendNotification } from "../utils/websocket.js";

function filterGameInfo(games, status) {
  return games
    .filter((game) => game.gameStatus === status)
    .map((g) => ({
      id: g.game.id,
      name: g.game.name,
      image: g.game.imageSmall,
    }));
}

export async function getProfile(profileName) {
  const user = await prisma.user.findUnique({
    where: { name: profileName },
    include: {
      userGames: {
        include: {
          game: true,
        },
      },
      sentRequests: {
        include: {
          receiver: true,
        },
      },
      receivedRequests: {
        include: {
          sender: true,
        },
      },
      reviews: {
        include: {
          user: true,

          game: {
            include: {
              platforms: true,
            },
          },

          platform: true,
        },
        orderBy: {
          id: "desc",
        },
      },
    },
  });
  if (!user) {
    const error = new Error("No user found");
    error.status = 404;
    throw error;
  }
  return {
    id: user.id,
    name: user.name,
    bio: user.bio,
    image: user.image? Buffer.from(user.image).toString('base64') : null,
    friends: [
      //... combines these into one array
      ...user.receivedRequests
        .filter((f) => f.friendStatus === "FRIENDS")
        .map((f) => ({
          id: f.sender.id,
          name: f.sender.name,
        })),
      ...user.sentRequests
        .filter((f) => f.friendStatus === "FRIENDS")
        .map((f) => ({
          id: f.receiver.id,
          name: f.receiver.name,
        })),
    ],
    received_reqs: user.receivedRequests
      .filter((f) => f.friendStatus === "PENDING")
      .map((f) => ({
        id: f.sender.id,
        name: f.sender.name,
      })),
    sent_reqs: user.sentRequests
      .filter((f) => f.friendStatus === "PENDING")
      .map((f) => ({
        id: f.receiver.id,
        name: f.receiver.name,
      })),
    favorites: user.userGames
      .filter((game) => game.favorite === true)
      .map((g) => ({
        id: g.game.id,
        name: g.game.name,
        image: g.game.imageSmall,
      })),
    to_play: filterGameInfo(user.userGames, "WANT_TO_PLAY"),
    playing: filterGameInfo(user.userGames, "PLAYING"),
    completed: filterGameInfo(user.userGames, "COMPLETED"),
    dnf: filterGameInfo(user.userGames, "DNF"),
    reviews: user.reviews.map((r) => ({
      id: r.id,
      game: r.game.name,
      rating: r.rating,
      review: r.review,
      createdAt: r.createdAt,
      platform: r.platform?.name,

      platforms: r.game.platforms.map((p) => p.name),

      user: {
        id: r.user.id,
        name: r.user.name,
      },
    })),
  };
}

export async function updateBio(profileName, newData) {
  const currentUser = await prisma.user.findUnique({
    where: { name: profileName },
  });
  if (!currentUser) {
    const error = new Error("No user found");
    error.status = 404;
    throw error;
  }
  await prisma.user.update({
    where: { name: profileName },
    data: {
      bio: newData.bio,
    },
  });
}

export async function uploadImage(profileName, imageFile) {
	const currentUser = await prisma.user.findUnique({ where: { name: profileName } });
	if (!currentUser) {
		const error = new Error("No user found");
		error.status = 404;
		throw error;
	}
	const updatedUser = await prisma.user.update({
	where: { name: profileName },
	data: {
		image: imageFile,
	},
	});
	return Buffer.from(updatedUser.image).toString('base64');
}

export async function deleteImage(profileName) {
	const currentUser = await prisma.user.findUnique({ where: { name: profileName } });
	if (!currentUser) {
		const error = new Error("No user found");
		error.status = 404;
		throw error;
	}
	await prisma.user.update({
	where: { name: profileName },
	data: {
		image: null,
	},
	});
}

export async function getFriendStatus(friendName, userId, userName) {
  const friend = await prisma.user.findUnique({ where: { name: friendName } });
  if (!friend) {
    const error = new Error("No user found");
    error.status = 404;
    throw error;
  }
  const userRelation1 = await prisma.userUserRelation.findUnique({
    where: { senderId_receiverId: { senderId: userId, receiverId: friend.id } },
  });
  const userRelation2 = await prisma.userUserRelation.findUnique({
    where: { senderId_receiverId: { senderId: friend.id, receiverId: userId } },
  });
  if (!userRelation1 && !userRelation2) return { friendStatus: undefined };
  if (userRelation1) {
    return {
      friendStatus: userRelation1.friendStatus,
      sender: userName,
    };
  }
  if (userRelation2) {
    return {
      friendStatus: userRelation2.friendStatus,
      sender: friendName,
    };
  }
}

//Friend functions
/*
- Checking the UserUserRelation from both angles as the friend request (User Relation) can be initiated by both parties.
- If relation already exists, we throw an error.
*/
export async function addFriend(friendName, user) {
  const friend = await prisma.user.findUnique({ where: { name: friendName } });

  const sender = await prisma.user.findUnique({
    where: { id: user },
    select: {
      id: true,
      name: true,
    },
  });

  if (!sender) {
    const error = new Error("No user found");
    error.status = 404;
    throw error;
  }

  if (!friend) {
    const error = new Error("No user found");
    error.status = 404;
    throw error;
  }
  const userRelation1 = await prisma.userUserRelation.findUnique({
    where: { senderId_receiverId: { senderId: user, receiverId: friend.id } },
  });
  const userRelation2 = await prisma.userUserRelation.findUnique({
    where: { senderId_receiverId: { senderId: friend.id, receiverId: user } },
  });
  if (userRelation1 || userRelation2) {
    const error = new Error("User relation already exists");
    error.status = 409;
    throw error;
  }
  await prisma.user.update({
    where: { id: user },
    data: {
      sentRequests: {
        create: {
          receiverId: friend.id,
          friendStatus: "PENDING",
        },
      },
    },
  });

  sendNotification(friend.id, {
    type: "friend-request",
    senderId: sender.id,
    senderName: sender.name,
  });
}

/*
- Here we are only interested in UserRelation where the other party, the friend, initiated the relation to the user.
- If there is no UserRelation or it's not in PENDING state, we throw an error.
*/
export async function acceptFriendRequest(friendName, user) {
  const friend = await prisma.user.findUnique({ where: { name: friendName } });
  if (!friend) {
    const error = new Error("No user found");
    error.status = 404;
    throw error;
  }
  const accepter = await prisma.user.findUnique({
    where: { id: user },
    select: {
      name: true,
    },
  });

  if (!accepter) {
    const error = new Error("No user found");
    error.status = 404;
    throw error;
  }
  const userRelation = await prisma.userUserRelation.findUnique({
    where: { senderId_receiverId: { senderId: friend.id, receiverId: user } },
  });
  if (!userRelation || userRelation.friendStatus !== "PENDING") {
    const error = new Error("No pending user relation");
    error.status = 400;
    throw error;
  }
  await prisma.userUserRelation.update({
    where: { senderId_receiverId: { senderId: friend.id, receiverId: user } },
    data: {
      friendStatus: "FRIENDS",
    },
  });

  sendNotification(friend.id, {
    type: "friend-request-accepted",
    userId: user,
    accepterName: accepter.name,
  });

  sendNotification(user, {
    type: "friend-request-accepted",
    userId: friend.id,
    accepterName: accepter.name,
  });

  await sendOnlineFriends(friend.id);
  await sendOnlineFriends(user);
}

/*
- Same rules apply here as to acceptFriendRequest.
- As we decline friend request, we can remove entire UserUserRelation database entry.
*/
export async function declineFriendRequest(friendName, user) {
  const friend = await prisma.user.findUnique({ where: { name: friendName } });

  if (!friend) {
    const error = new Error("No user found");
    error.status = 404;
    throw error;
  }

  const decliner = await prisma.user.findUnique({
    where: { id: user },
    select: {
      name: true,
    },
  });

  if (!decliner) {
    const error = new Error("No user found");
    error.status = 404;
    throw error;
  }

  const userRelation = await prisma.userUserRelation.findUnique({
    where: { senderId_receiverId: { senderId: friend.id, receiverId: user } },
  });

  if (!userRelation || userRelation.friendStatus !== "PENDING") {
    const error = new Error("No pending user relation");
    error.status = 400;
    throw error;
  }

  await prisma.userUserRelation.delete({
    where: { senderId_receiverId: { senderId: friend.id, receiverId: user } },
  });

  sendNotification(friend.id, {
    type: "friend-request-declined",
    declinerName: decliner.name,
  });

  await sendOnlineFriends(friend.id);
  await sendOnlineFriends(user);
}

/*
- Remove friend can be done by the initiator to both PENDING and FRIENDS statuses. The accepter can only remove FRIENDS because for PENDING requests, they may use decline.
- As we remove friend, we can remove entire UserUserRelation database entry.
*/
export async function removeFriend(friendName, user) {
  const friend = await prisma.user.findUnique({ where: { name: friendName } });
  if (!friend) {
    const error = new Error("No user found");
    error.status = 404;
    throw error;
  }
  const userRelation1 = await prisma.userUserRelation.findUnique({
    where: { senderId_receiverId: { senderId: user, receiverId: friend.id } },
  });
  const userRelation2 = await prisma.userUserRelation.findUnique({
    where: { senderId_receiverId: { senderId: friend.id, receiverId: user } },
  });
  if (!userRelation1 && !userRelation2) {
    const error = new Error("User relation does not exist");
    error.status = 404;
    throw error;
  }
  if (userRelation2 && userRelation2.friendStatus == "PENDING") {
    const error = new Error("No remove action is allowed");
    error.status = 403;
    throw error;
  }
  if (userRelation1) {
    await prisma.userUserRelation.delete({
      where: { senderId_receiverId: { senderId: user, receiverId: friend.id } },
    });
  }
  if (userRelation2) {
    await prisma.userUserRelation.delete({
      where: { senderId_receiverId: { senderId: friend.id, receiverId: user } },
    });
  }

  sendNotification(friend.id, {
    type: "friend-removed",
    userId: user,
  });

  sendNotification(user, {
    type: "friend-removed",
    userId: friend.id,
  });

  await sendOnlineFriends(friend.id);
  await sendOnlineFriends(user);
}
