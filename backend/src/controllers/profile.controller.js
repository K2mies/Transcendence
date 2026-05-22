import * as profileService from "../services/profile.service.js"

export async function getProfile(req, res)
{
	const userName = req.params.name
	try {
		const profile = await profileService.getProfile(userName)
		if (!profile)
			return res.status(404).json({ error: "User not found" });
		res.status(200).json(profile);
	} catch (error) {
		return res.status(500).json({ error: "Internal server error" });
	}
}

export async function updateProfile(req, res)
{
	const userName = req.params.name
	const newData = req.body
	try {
		const profile = await profileService.updateProfile(userName, newData)
		if (!profile)
			return res.status(404).json({ error: "User not found" });
		res.status(200).json(profile);
	} catch (error) {
		res.status(409).json({ error })
	}
}

export async function addFriend(req, res)
{
	const friend = await prisma.user.findUnique({ where: { name: req.params.name }})
	if (!friend)
		return res.status(404).json({ error: "No user found" }); //friend must exist, double check error code
	if (friend.name == req.user.name)
		return res.status(404).json({ error: "Operation forbidden" }); //cannot add yourself as friend, double check the error code
	await profileService.addFriend(friend.id, req.user.id)
}

export async function addFriend(friend, user)
{
	//We need to check the UserUserRelation from both angles as the friend request (User Relation) can be initiated from both users
	const userRelation1 = await prisma.userUserRelation.findUnique({ where: { senderId: user, receiverId: friend }})
	const userRelation2 = await prisma.userUserRelation.findUnique({ where: { senderId: friend, receiverId: user }})
	if (userRelation1 || userRelation2) //this means the relation is already in PENDING or FRIENDS state
		throw "User relation already exists" //error code?
	await prisma.user.update({
	where: { id: user },
	data: {
	sentRequests: {
		create: [
			{
				receiverId: { connect: { id: friend }},
				status: "PENDING"
			}
		]
	}
	},
	});
}

export async function acceptFriendRequest(friend, user)
{
	//here we are only interested in userrelation where the other one initiated the relation to the user
	const userRelation = await prisma.userUserRelation.findUnique({ where: { senderId: friend, receiverId: user}})
	if (!userRelation || userRelation.status != "PENDING")
		throw "No pending user relation"		
	await prisma.userUserRelation.update({
	where: { senderId: friend, receiverId: user}, //now since i am accepting, the friend here is the user
	data: {
			status: "FRIENDS"
	},
	});
}

export async function declineFriendRequest(friend, user)
{
	const userRelation = await prisma.userUserRelation.findUnique({ where: { senderId: friend, receiverId: user}})
	if (!userRelation || userRelation.status != "PENDING")
		throw "No pending user relation"		
	await prisma.userUserRelation.delete({ //As we remove friend, we can remove the entire UserUserRelation db entry
	where: { senderId: friend, receiverId: user},
	});
}
//remove friend can be done by the initiater to both pending and friends. the accepter can only remove FRIENDS because they have the decline
export async function removeFriend(friend, user)
{
	//We need to check the UserUserRelation from both angles as the friend request (User Relation) can be initiated from both users
	const userRelation1 = await prisma.userUserRelation.findUnique({ where: { senderId: user, receiverId: friend }})
	const userRelation2 = await prisma.userUserRelation.findUnique({ where: { senderId: friend, receiverId: user }})
	if (!userRelation1 && !userRelation2)
	{
		throw "User relation does not exist"
	}
	if (userRelation2 && userRelation2.status == "PENDING") //if you have received a friend request and its pending, you should not be able to remove friend
	{
		throw "No remove action is allowed"
	}
	if (userRelation1)
	{
		await prisma.userUserRelation.delete({ //As we remove friend, we can remove the entire UserUserRelation db entry
		where: { senderId: user, receiverId: friend},
	});
	}
	if (userRelation2)
	{
		await prisma.userUserRelation.delete({ //As we remove friend, we can remove the entire UserUserRelation db entry
		where: { senderId: friend, receiverId: user},
	});
	}
}
