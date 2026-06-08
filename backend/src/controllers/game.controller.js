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
		return res.status(500).json({ error: error });
	}
}
