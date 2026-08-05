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
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || "Internal server error",
    });
  }
}

//gets all the genres for the front end
export async function getGenres(req, res) {
  try {
    const genres = await prisma.genre.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    res.status(200).json({
      status: "success",
      data: genres,
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || "Internal server error",
    });
  }
}

//gets all the platforms for the front end
export async function getPlatforms(req, res) {
  try {
    const platforms = await prisma.platform.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    res.status(200).json({
      status: "success",
      data: platforms,
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || "Internal server error",
    });
  }
}

//gets all developers for the front end
export async function getDevelopers(req, res) {
  try {
    const developers = await prisma.game.findMany({
      select: {
        developer: true,
      },
      distinct: ["developer"],
      orderBy: {
        developer: "asc",
      },
    });

    res.status(200).json({
      status: "success",
      data: developers.filter((d) => d.developer),
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      message: error.message || "Internal server error",
    });
  }
}
