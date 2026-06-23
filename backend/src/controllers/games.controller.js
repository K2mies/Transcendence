import { getGames } from "../services/games.service.js";

export async function getGamesController(req, res) {
  try {
    const result = await getGames(req.query, req.user.id);

    return res.status(200).json({
      status: "success",
      data: result.games,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error("Error fetching games:");
    console.error(error);

    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}
