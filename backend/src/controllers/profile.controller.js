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
	const friendName = req.params.name
	if (friendName == req.user.name)
		return res.status(400).json({ error: "Operation forbidden" });
	try {
		const friendStatus = await profileService.addFriend(friendName, req.user.id)
		res.status(200).json({ status: "success"})
	} catch (error) {
		res.status(409).json({ error }) //user relation already exists
	}
}

export async function acceptFriendRequest(req, res)
{
	const friendName = req.params.name
	if (friendName == req.user.name)
		return res.status(400).json({ error: "Operation forbidden" });
	try {
		const friendStatus = await profileService.acceptFriendRequest(friendName, req.user.id)
		res.status(200).json(friendStatus)
	} catch (error) {
		res.status(409).json({ error }) //no pending user relation
	}
}

export async function declineFriendRequest(req, res)
{
	const friendName = req.params.name
	if (friendName == req.user.name)
		return res.status(400).json({ error: "Operation forbidden" });
	try {
		const friendStatus = await profileService.declineFriendRequest(friendName, req.user.id)
		res.status(200).json(friendStatus)
	} catch (error) {
		res.status(409).json({ error }) //no pending user relation
	}
}

export async function removeFriend(req, res)
{
	const friendName = req.params.name
	if (friendName == req.user.name)
		return res.status(400).json({ error: "Operation forbidden" });
	try {
		const friendStatus = await profileService.removeFriend(friendName, req.user.id)
		res.status(200).json(friendStatus)
	} catch (error) {
		res.status(409).json({ error }) //user relation does not exist or no removal allowed
	}
}
