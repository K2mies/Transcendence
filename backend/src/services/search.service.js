import { prisma } from "../config/db.js";

export async function getAllGames() {
  const games = await prisma.game.findMany({
    select: {
      id: true,
      name: true,
      imageSmall: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return games.map((game) => ({
    id: game.id,
    title: game.name,
    image: game.imageSmall,
  }));
}
