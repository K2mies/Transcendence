import * as profileService from "../services/profile.service.js"

export async function getProfile(req, res)
{
	const userName = req.params.name
	try {
		const profile = await profileService.getProfile(userName)
		res.status(200).json(profile);
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}

export async function updateProfile(req, res)
{
	const userName = req.user.name
	const newData = req.body
	try {
		const profile = await profileService.updateProfile(userName, newData)
		res.status(200).json(profile);
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}

export async function getFriendStatus(req, res)
{
	const friendName = req.params.name
	if (friendName == req.user.name)
		return res.status(403).json({ message: "Operation forbidden" });
	try {
		const friendStatus = await profileService.getFriendStatus(friendName, req.user.id, req.user.name)
		res.status(200).json(friendStatus)
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}

export async function addFriend(req, res)
{
	const friendName = req.params.name
	if (friendName === req.user.name)
		return res.status(403).json({ message: "Operation forbidden" });
	try {
		await profileService.addFriend(friendName, req.user.id)
		res.status(200).json({ message: "Friend request sent" })
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}

export async function acceptFriendRequest(req, res)
{
	const friendName = req.params.name
	if (friendName === req.user.name)
		return res.status(403).json({ message: "Operation forbidden" });
	try {
		await profileService.acceptFriendRequest(friendName, req.user.id)
		res.status(200).json({ message: "Friend request accepted" })
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}

export async function declineFriendRequest(req, res)
{
	const friendName = req.params.name
	if (friendName === req.user.name)
		return res.status(403).json({ message: "Operation forbidden" });
	try {
		await profileService.declineFriendRequest(friendName, req.user.id)
		res.status(200).json({ message: "Friend request declined" })
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}

export async function removeFriend(req, res)
{
	const friendName = req.params.name
	if (friendName === req.user.name)
		return res.status(403).json({ message: "Operation forbidden" });
	try {
		await profileService.removeFriend(friendName, req.user.id)
		res.status(200).json({ message: "Friend removed" })
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}
