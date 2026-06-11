import * as gameService from "../services/game.service.js"

export async function getGame(req, res)
{
	const gameName = req.params.name;
	const currentUserId = req.user?.id;
	try {
		const game = await gameService.getGame(gameName, currentUserId)
		res.status(200).json(game);
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}

export async function updateGameRelation(req, res)
{
	const game = req.params.name
	const userId = req.user.id
	const newData = req.body
	try {
		await gameService.updateGameRelation(userId, newData, game)
		res.status(200).json({ message: "Status updated"});
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}

export async function addReview(req, res)
{
	const game = req.params.name
	const userId = req.user.id
	const newData = req.body
	try {
		await gameService.addReview(userId, newData, game)
		res.status(200).json({ message: "Review added"});
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}

export async function deleteReview(req, res)
{
	const game = req.params.name
	const userId = req.user.id
	try {
		await gameService.deleteReview(userId, game)
		res.status(200).json({ message: "Review removed"});
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}
