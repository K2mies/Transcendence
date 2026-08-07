import { getGames } from "../services/games.service.js";

export async function getGamesController(req, res) {
  try {
    const result = await getGames(req.query, req.user.id);

    res.status(200).json({
      status: "success",
      data: result.games,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || "Internal server error",
    });
  }
}
