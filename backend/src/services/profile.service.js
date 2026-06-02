import {prisma} from "../config/db.js";

function filterGameInfo(games, status)
{
	return games
	.filter(game => game.status === status)
	.map(g => ({
	id: g.game.id,
	name: g.game.name,
	image: g.game.imageSmall
	}))
}

export async function getProfile(profileName)
{
	const user = await prisma.user.findUnique({
	where: { name: profileName },
	include: {
		userGames: {
			include: {
				game: true,
				platform: true,
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
	},
	})
	return {
		id: user.id,
		name: user.name,
		bio: user.bio,
		friends : [ //... combines these into one array
			...user.receivedRequests
			.filter(f => f.status === "FRIENDS")
			.map(f => ({
			id: f.sender.id,
			name: f.sender.name
		})),
			...user.sentRequests
			.filter(f => f.status === "FRIENDS")
			.map(f => ({
			id: f.receiver.id,
			name: f.receiver.name
		})),
		],
		favorites: user.userGames
		.filter(game => game.favorite === true)
		.map(g => ({
		id: g.game.id,
		name: g.game.name,
		image: g.game.imageSmall
  		})),
		to_play: filterGameInfo(user.userGames, "WANT_TO_PLAY"),
		playing: filterGameInfo(user.userGames, "PLAYING"),
		completed: filterGameInfo(user.userGames, "COMPLETED"),
		dnf: filterGameInfo(user.userGames, "DNF"),
	}
}

export async function updateProfile(profileName, newData)
{
	const existingUser = await prisma.user.findUnique({ where: { name: newData.name}})
	if (existingUser && existingUser.name != profileName)
	{
		throw "Username already taken"
	}
	const updateUser = await prisma.user.update({
	where: { name: profileName },
	data: {
	name: newData.name,
	bio: newData.bio
	},
	});
	return updateUser
}

//Friend functions
/*
- Checking the UserUserRelation from both angles as the friend request (User Relation) can be initiated by both parties.
- If relation already exists, we throw an error.
*/
export async function addFriend(friendName, user)
{
	const friend = await prisma.user.findUnique({ where: { name: friendName }})
	if (!friend)
		throw "No user found"
	const userRelation1 = await prisma.userUserRelation.findUnique({ where: { senderId_receiverId: { senderId: user, receiverId: friend.id }}})
	const userRelation2 = await prisma.userUserRelation.findUnique({ where: { senderId_receiverId: { senderId: friend.id, receiverId: user }}})
	if (userRelation1 || userRelation2)
		throw "User relation already exists"
	await prisma.user.update({
	where: { id: user },
	data: {
	sentRequests: {
		create: {
				receiverId: friend.id,
				status: "PENDING"
				}
		}
	},
	});
}

/*
- Here we are only interested in UserRelation where the other party, the friend, initiated the relation to the user.
- If there is no UserRelation or it's not in PENDING state, we throw an error.
*/
export async function acceptFriendRequest(friendName, user)
{
	const friend = await prisma.user.findUnique({ where: { name: friendName }})
	if (!friend)
		throw "No user found"
	const userRelation = await prisma.userUserRelation.findUnique({ where: { senderId_receiverId: { senderId: friend.id, receiverId: user}}})
	if (!userRelation || userRelation.status != "PENDING")
		throw "No pending user relation"		
	await prisma.userUserRelation.update({
	where: { senderId_receiverId: { senderId: friend.id, receiverId: user}},
	data: {
			status: "FRIENDS"
	},
	});
}

/*
- Same rules apply here as to acceptFriendRequest.
- As we decline friend request, we can remove entire UserUserRelation database entry.
*/
export async function declineFriendRequest(friendName, user)
{
	const friend = await prisma.user.findUnique({ where: { name: friendName }})
	if (!friend)
		throw "No user found"
	const userRelation = await prisma.userUserRelation.findUnique({ where: { senderId_receiverId: { senderId: friend.id, receiverId: user}}})
	if (!userRelation || userRelation.status != "PENDING")
		throw "No pending user relation"		
	await prisma.userUserRelation.delete({
	where: { senderId_receiverId: { senderId: friend.id, receiverId: user}},
	});
}

/*
- Remove friend can be done by the initiator to both PENDING and FRIENDS statuses. The accepter can only remove FRIENDS because for PENDING requests, they may use decline.
- As we remove friend, we can remove entire UserUserRelation database entry.
*/
export async function removeFriend(friendName, user)
{
	const friend = await prisma.user.findUnique({ where: { name: friendName }})
	if (!friend)
		throw "No user found"
	const userRelation1 = await prisma.userUserRelation.findUnique({ where: { senderId_receiverId: { senderId: user, receiverId: friend.id }}})
	const userRelation2 = await prisma.userUserRelation.findUnique({ where: { senderId_receiverId: { senderId: friend.id, receiverId: user }}})
	if (!userRelation1 && !userRelation2)
	{
		throw "User relation does not exist"
	}
	if (userRelation2 && userRelation2.status == "PENDING")
	{
		throw "No remove action is allowed"
	}
	if (userRelation1)
	{
		await prisma.userUserRelation.delete({
		where: { senderId_receiverId: { senderId: user, receiverId: friend.id}},
	});
	}
	if (userRelation2)
	{
		await prisma.userUserRelation.delete({
		where: { senderId_receiverId: { senderId: friend.id, receiverId: user}},
	});
	}
}














// //Friend functions
// export async function addFriend(friend, user)
// {
// 	//We need to check the UserUserRelation from both angles as the friend request (User Relation) can be initiated from both users
// 	const userRelation1 = await prisma.userUserRelation.findUnique({ where: { senderId: user, receiverId: friend }})
// 	const userRelation2 = await prisma.userUserRelation.findUnique({ where: { senderId: friend, receiverId: user }})
// 	if (userRelation1 || userRelation2) //this means the relation is already in PENDING or FRIENDS state
// 		throw "User relation already exists" //error code?
// 	await prisma.user.update({
// 	where: { id: user },
// 	data: {
// 	sentRequests: {
// 		create: [
// 			{
// 				receiverId: { connect: { id: friend }},
// 				status: "PENDING"
// 			}
// 		]
// 	}
// 	},
// 	});
// }

// export async function acceptFriendRequest(friend, user)
// {
// 	//here we are only interested in userrelation where the other one initiated the relation to the user
// 	const userRelation = await prisma.userUserRelation.findUnique({ where: { senderId: friend, receiverId: user}})
// 	if (!userRelation || userRelation.status != "PENDING")
// 		throw "No pending user relation"		
// 	await prisma.userUserRelation.update({
// 	where: { senderId: friend, receiverId: user}, //now since i am accepting, the friend here is the user
// 	data: {
// 			status: "FRIENDS"
// 	},
// 	});
// }

// export async function declineFriendRequest(friend, user)
// {
// 	const userRelation = await prisma.userUserRelation.findUnique({ where: { senderId: friend, receiverId: user}})
// 	if (!userRelation || userRelation.status != "PENDING")
// 		throw "No pending user relation"		
// 	await prisma.userUserRelation.delete({ //As we remove friend, we can remove the entire UserUserRelation db entry
// 	where: { senderId: friend, receiverId: user},
// 	});
// }

// //remove friend can be done by the initiater to both pending and friends. the accepter can only remove FRIENDS because they have the decline
// export async function removeFriend(friend, user)
// {
// 	//We need to check the UserUserRelation from both angles as the friend request (User Relation) can be initiated from both users
// 	const userRelation1 = await prisma.userUserRelation.findUnique({ where: { senderId: user, receiverId: friend }})
// 	const userRelation2 = await prisma.userUserRelation.findUnique({ where: { senderId: friend, receiverId: user }})
// 	if (!userRelation1 && !userRelation2)
// 	{
// 		throw "User relation does not exist"
// 	}
// 	if (userRelation2 && userRelation2.status == "PENDING") //if you have received a friend request and its pending, you should not be able to remove friend
// 	{
// 		throw "No remove action is allowed"
// 	}
// 	if (userRelation1)
// 	{
// 		await prisma.userUserRelation.delete({ //As we remove friend, we can remove the entire UserUserRelation db entry
// 		where: { senderId: user, receiverId: friend},
// 	});
// 	}
// 	if (userRelation2)
// 	{
// 		await prisma.userUserRelation.delete({ //As we remove friend, we can remove the entire UserUserRelation db entry
// 		where: { senderId: friend, receiverId: user},
// 	});
// 	}
// }
