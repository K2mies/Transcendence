import { getAllGames } from "../services/search.service.js";
import { prisma } from "../config/db.js"; //temp delete used to get genre list

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

//gets all the genre's for the front end
export async function getGenres(req, res) {
  const genres = await prisma.genre.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  res.json({
    status: "success",
    data: genres,
  });
}

//gets all the platforms for the front end
export async function getPlatforms(req, res) {
  const platforms = await prisma.platform.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  res.json({
    status: "success",
    data: platforms,
  });
}
