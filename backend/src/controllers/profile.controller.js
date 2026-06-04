import * as profileService from "../services/profile.service.js"

export async function getProfile(req, res)
{
	const userName = req.params.name
	try {
		const profile = await profileService.getProfile(userName)
		if (!profile)
			return res.status(404).json({ message: "User not found" });
		res.status(200).json(profile);
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
}

export async function updateProfile(req, res)
{
	const userName = req.params.name
	const newData = req.body
	try {
		const profile = await profileService.updateProfile(userName, newData)
		if (!profile)
			return res.status(404).json({ message: "User not found" });
		res.status(200).json(profile);
	} catch (error) {
		res.status(409).json({ message: error })
	}
}

export async function getFriendStatus(req, res)
{
	const friendName = req.params.name
	if (friendName == req.user.name)
		return res.status(400).json({ message: "Operation forbidden" });
	try {
		const friendStatus = await profileService.getFriendStatus(friendName, req.user.id)
		res.status(200).json(friendStatus)
	} catch (error) {
		res.status(error.status).json({ message: error.message })
	}
}

export async function addFriend(req, res)
{
	const friendName = req.params.name
	if (friendName == req.user.name)
		return res.status(400).json({ message: "Operation forbidden" });
	try {
		const friendStatus = await profileService.addFriend(friendName, req.user.id)
		res.status(200).json({ message: "Friend request sent" })
	} catch (error) {
		res.status(error.status).json({ message: error.message }) //user relation already exists
	}
}

export async function acceptFriendRequest(req, res)
{
	const friendName = req.params.name
	if (friendName == req.user.name)
		return res.status(400).json({ message: "Operation forbidden" });
	try {
		const friendStatus = await profileService.acceptFriendRequest(friendName, req.user.id)
		res.status(200).json({ message: "Friend request accepted" })
	} catch (error) {
		res.status(error.status).json({ message: error.message }) //no pending user relation
	}
}

export async function declineFriendRequest(req, res)
{
	const friendName = req.params.name
	if (friendName == req.user.name)
		return res.status(400).json({ message: "Operation forbidden" });
	try {
		const friendStatus = await profileService.declineFriendRequest(friendName, req.user.id)
		res.status(200).json({ message: "Friend request declined" })
	} catch (error) {
		res.status(error.status).json({ message: error.message }) //no pending user relation
	}
}

export async function removeFriend(req, res)
{
	const friendName = req.params.name
	if (friendName == req.user.name)
		return res.status(400).json({ message: "Operation forbidden" });
	try {
		const friendStatus = await profileService.removeFriend(friendName, req.user.id)
		res.status(200).json({ message: "Friend removed" })
	} catch (error) {
		res.status(error.status).json({ message: error.message }) //user relation does not exist or no removal allowed
	}
}
