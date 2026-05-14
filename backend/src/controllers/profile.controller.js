import * as profileService from "../services/profile.service.js" //here we import the entire file because this file might contain multiple functions

export async function getProfile(req, res)
{
	const userId = Number(req.params.id)
	const profile = await profileService.getProfile(userId)
	console.log(profile)
	res.json(profile)
}

export async function updateProfile(req, res)
{
	const userId = Number(req.params.id)
	// if (userId != req.user.id) { //This is commented out for now but we need this as the user can only update their own profile
	// 	return res.status(403).json({ "Request forbidden" })
	// }
	const newData = req.body
	try {
		const profile = await profileService.updateProfile(userId, newData)
		console.log(profile)
		res.json(profile)
	} catch (error) {
		res.status(409).json({ error })		
	}
}

export async function addFriend(req, res)
{
	const targetId = Number(req.params.id)
	//Then here we run a check if this userid is the same as your user id, return error because you cant add yourself!
	//same goes for other controller functions, you cannot accept, decline or remove yourself.
	await profileService.addFriend(targetId, req.user.id)
}

export async function addFriend(target, user)
{
	//We need to check the UserUserRelation from both angles as the friend request (User Relation) can be initiated from both users
	const userRelation1 = await prisma.userUserRelation.findUnique({ where: { userId: user, friendId: target }})
	const userRelation2 = await prisma.userUserRelation.findUnique({ where: { userId: target, friendId: user }})
	if (userRelation1 || userRelation2) //this means the relation is already in PENDING or FRIENDS state
	{
		throw "User relation already exists"
	}

	await prisma.user.update({
	where: { id: user },
	data: {
	sentRequests: {
		create: [
			{
				friendId: { connect: { id: target }},
				status: "PENDING"
			}
		]
	}
	},
	});
}

export async function acceptFriendRequest(target, user)
{
	//here we are only interested in userrelation where the other one initiated the relation to the user
	const userRelation = await prisma.userUserRelation.findUnique({ where: { userId: target, friendId: user}})
	if (!userRelation || userRelation.status != "PENDING")
	{
		throw "No pending user relation"		
	}
	await prisma.userUserRelation.update({
	where: { userId: target, friendId: user}, //now since i am accepting, the friend here is the user
	data: {
			status: "FRIENDS"
	},
	});
}

export async function declineFriendRequest(target, user)
{
	const userRelation = await prisma.userUserRelation.findUnique({ where: { userId: target, friendId: user}})
	if (!userRelation || userRelation.status != "PENDING")
	{
		throw "No pending user relation"		
	}
	await prisma.userUserRelation.delete({ //As we remove friend, we can remove the entire UserUserRelation db entry
	where: { userId: target, friendId: user},
	});
}
//as a side note, we should remove the NONE enum status from the schema because in that case, we just remove the db entry
//remove friend can be done by the initiater to both pending and friends. the accepter can only remove FRIENDS because they have the decline
export async function removeFriend(target, user)
{
	//We need to check the UserUserRelation from both angles as the friend request (User Relation) can be initiated from both users
	const userRelation1 = await prisma.userUserRelation.findUnique({ where: { userId: user, friendId: target }})
	const userRelation2 = await prisma.userUserRelation.findUnique({ where: { userId: target, friendId: user }})
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
	where: { userId: user, friendId: target},
	});
	}
	if (userRelation2)
	{
	await prisma.userUserRelation.delete({ //As we remove friend, we can remove the entire UserUserRelation db entry
	where: { userId: target, friendId: user},
	});
	}
}
//another side note, maybe the given arguments could be worded better as it was pretty confusing to implement this
//also maybe the schema is not user and friend but it should be requester and target or something because this is pretty confusing as in
//this code the friend is sometimes the user
