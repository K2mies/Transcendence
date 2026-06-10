import { getAllGames } from "../services/search.service.js";

export async function getGames(req, res) {
  try {
    const games = await getAllGames();

    res.status(200).json({
      status: "success",
      data: games,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: "Failed to get games",
    });
  }
}
