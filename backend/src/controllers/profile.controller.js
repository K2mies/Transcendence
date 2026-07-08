import * as profileService from "../services/profile.service.js"
import sharp from "sharp";

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

/*
With sharp we can adjust the image, we first resize it to 512 x 512 pixels.
The fit: cover here means it centers the image if cropping happens.
Quality just lowers the image quality so it wont take so much space.
FailOn none was added as sometimes JPEG might have an extra byte in the end.
*/
export async function uploadImage(req, res)
{
	const imageFile = req.file.buffer;
	const userName = req.user.name
	try {
//		const metadata = await sharp(imageFile).metadata();
//		console.log(metadata);
		const modifiedImage = await sharp(imageFile, { failOn: "none"})
			.resize(512, 512, { fit: 'cover'})
			.jpeg({ quality: 80})
			.toBuffer();
		const image = await profileService.uploadImage(userName, modifiedImage)
		res.status(200).json(image);
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}

export async function deleteImage(req, res)
{
	const userName = req.user.name
	try {
		await profileService.deleteImage(userName)
		res.status(200).json({ message: "Image deleted"});
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
