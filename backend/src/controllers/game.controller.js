import * as gameService from "../services/game.service.js"

export async function getGame(req, res)
{
	const gameName = req.params.name;
	const currentUserId = req.user.id;
	try {
		const game = await gameService.getGame(gameName, currentUserId)
		if (!game) {
			return res.status(404).json({ error: "Game not found" });
		}
		res.status(200).json(game);
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
	const game = req.params.name
	const userId = req.user.id
	const newData = req.body
	console.log("NEWDATA IS")
	console.log(newData);
	try {
		await gameService.updateGameRelation(userId, newData, game)
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
		await gameService.addReview(userId, newData, game)
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
		await gameService.deleteReview(userId, game)
		res.status(200).json({ message: "Review removed"});
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}
