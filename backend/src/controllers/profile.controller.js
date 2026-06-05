import { prisma } from "../config/db.js";
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
	const userName = req.user.name
	const newData = req.body
	try {
		const profile = await profileService.updateProfile(userName, newData)
		if (!profile)
			return res.status(404).json({ message: "User not found" });
		res.status(200).json(profile);
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}

export async function addFriend(req, res)
{
	const friendName = req.params.name
	if (friendName === req.user.name)
		return res.status(400).json({ message: "Operation forbidden" });
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
		return res.status(400).json({ message: "Operation forbidden" });
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
		return res.status(400).json({ message: "Operation forbidden" });
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
		return res.status(400).json({ message: "Operation forbidden" });
	try {
		await profileService.removeFriend(friendName, req.user.id)
		res.status(200).json({ message: "Friend removed" })
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}

//NEW STUFF profile/games/:gameName
//Also maybe we want to have the platform specification rather in review and not in usergamerelation (remember to push 
//profiles seed and add new migrations)
//and also make sure you add the reviews
//we could also add this same setup with favourite
//we need also remove review. ONLY YOURS

export async function updateGameRelation(req, res)
{
	const game = req.params.gameName
	const userId = req.user.id
	const newData = req.body
	try {
		await profileService.updateGameRelation(userId, newData, game)
		res.status(200).json({ message: "Status updated"});
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}

export async function addReview(req, res)
{
	const game = req.params.gameName
	const userId = req.user.id
	const newData = req.body
	try {
		await profileService.addReview(userId, newData, game)
		res.status(200).json({ message: "Review added"});
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}

export async function deleteReview(req, res)
{
	const game = req.params.gameName
	const userId = req.user.id
	try {
		await profileService.deleteReview(userId, game)
		res.status(200).json({ message: "Review removed"});
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}

export async function updateGameRelation(userId, newData, gameName)
{
	const game = await prisma.game.findUnique({ where: { name: gameName }})
	if (!game)
	{
		const error = new Error("Game not found")
		error.status = 404
		throw error
	}
	await prisma.userGameRelation.upsert({
		where: {
			userId_gameId: {
				userId: userId,
				gameId: game.id
			}
		},
		update: {
			status: newData.status,
			favorite: newData.favorite
		},
		create: {
			userId: userId,
			gameId: game.id,
			status: newData.status,
			favorite: newData.favorite
		}
	})
}

export async function addReview(userId, newData, gameName)
{
	const game = await prisma.game.findUnique({ where: { name: gameName }})
	if (!game)
	{
		const error = new Error("Game not found")
		error.status = 404
		throw error
	}
	const platform = await prisma.platform.findUnique({ where: { name: newData.platform }})
	await prisma.review.upsert({
		where: { userId_gameId: { userId: userId, gameId: game.id }},
		update: {
			review: newData.review,
			rating: newData.rating,
			platformId: platform?.id
		},	
		create: {
			gameId: game.id,
			userId: userId,
			review: newData.review,
			rating: newData.rating,
			platformId: platform?.id
		}
	})
}

export async function deleteReview(userId, gameName)
{
	const game = await prisma.game.findUnique({ where: { name: gameName }})
	if (!game)
	{
		const error = new Error("Game not found")
		error.status = 404
		throw error
	}
	await prisma.review.delete({
	where: { userId_gameId: { userId: userId, gameId: game.id}},
	});
}