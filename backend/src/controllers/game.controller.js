import * as gameService from "../services/game.service.js";

export async function getGame(req, res) {
  const gameName = req.params.name;
  try {
    const game = await gameService.getGame(gameName);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Internal server error" })
  }
}
