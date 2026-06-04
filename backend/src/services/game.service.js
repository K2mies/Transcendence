import { prisma } from "../config/db.js";

export async function getGame(gameName, currentUserId) {
  const game = await prisma.game.findUnique({
    where: { name: gameName },
    select: {
      id: true,
      name: true,
      imageBig: true,
      description: true,
      releaseDate: true,
      updateDate: true,
      developer: true,
      publisher: true,
      rating: true,
      reviews: {
        select: {
          id: true,
          rating: true,
          review: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      userGames: true,
      modes: true,
      genres: true,
      platforms: true,
    },
  });
  return {
    id: game.id,
    name: game.name,
    image: game.imageBig,
    description: game.description,
    releaseDate: game.releaseDate,
    updateDate: game.updateDate,
    developer: game.developer,
    publisher: game.publisher,
    rating: game.rating,
    reviews: game.reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      review: r.review,
      user: {
        id: r.user.id,
        name: r.user.name,
      },
    })),
    modes: game.modes.map((m) => m.name),
    genres: game.genres.map((g) => g.name),
    platforms: game.platforms.map((p) => p.name),
    // favorite: game.userGames.find(ug => ug.userId == currentUserId).favorite,
    // status: game.userGames.find(ug => ug.userId == currentUserId).status
  };
}
