import { prisma } from "../config/db.js";

async function addFavoriteStatus(games, currentUserId) {
  if (games.length === 0) return games;

  const favorites = await prisma.userGameRelation.findMany({
    where: {
      userId: Number(currentUserId),
      gameId: {
        in: games.map((game) => game.id),
      },
    },
    select: {
      gameId: true,
      favorite: true,
    },
  });

  return games.map((game) => {
    const favorite = favorites.find((f) => f.gameId === game.id);

    return {
      ...game,
      favorite: favorite?.favorite ?? false,
    };
  });
}

async function getNewestGames(currentUserId) {
  const newestGames = await prisma.game.findMany({
    select: {
      id: true,
      name: true,
      imageSmall: true,
    },
    take: 30,
    orderBy: { releaseDate: "desc" },
  });

  const result = newestGames.map((g) => ({
    id: g.id,
    name: g.name,
    image: g.imageSmall,
  }));

  return addFavoriteStatus(result, currentUserId);
}

async function getTopRatedGames(currentUserId) {
  const games = await prisma.game.findMany({
    select: {
      id: true,
      name: true,
      imageSmall: true,
      reviews: {
        select: { rating: true },
      },
    },
  });

  const topRated = games
    .map((g) => {
      let sum = 0;

      for (let i = 0; i < g.reviews.length; i++) {
        sum += g.reviews[i].rating;
      }

      let average = null;

      if (g.reviews.length !== 0) {
        average = sum / g.reviews.length;
      }

      return {
        id: g.id,
        name: g.name,
        image: g.imageSmall,
        average: average,
      };
    })
    .sort((a, b) => b.average - a.average)
    .slice(0, 30);

  return addFavoriteStatus(topRated, currentUserId);
}

async function getMostPlayedGames(currentUserId) {
  const games = await prisma.game.findMany({
    select: {
      id: true,
      name: true,
      imageSmall: true,
      userGames: {
        select: {
          gameStatus: true,
        },
        where: {
          gameStatus: {
            in: ["PLAYING", "COMPLETED"],
          },
        },
      },
    },
  });

  const mostPlayed = games
    .map((g) => ({
      id: g.id,
      name: g.name,
      image: g.imageSmall,
      count: g.userGames.length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 30);

  return addFavoriteStatus(mostPlayed, currentUserId);
}

async function getTrendingGames(currentUserId) {
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

  const games = await prisma.game.findMany({
    select: {
      id: true,
      name: true,
      imageSmall: true,
      reviews: {
        where: {
          createdAt: {
            gte: oneMonthAgo,
          },
        },
      },
      userGames: {
        select: {
          favorite: true,
          gameStatus: true,
        },
        where: {
          createdAt: {
            gte: oneMonthAgo,
          },
        },
      },
    },
  });

  const trending = games
    .map((g) => ({
      id: g.id,
      name: g.name,
      image: g.imageSmall,
      traction:
        g.reviews.length +
        g.userGames.filter((ug) => ug.gameStatus !== null).length +
        g.userGames.filter((ug) => ug.favorite).length,
    }))
    .sort((a, b) => b.traction - a.traction)
    .slice(0, 30);

  return addFavoriteStatus(trending, currentUserId);
}

export async function getDashboard(currentUserId) {
  const [trending, topRated, mostPlayed, newestReleases] = await Promise.all([
    getTrendingGames(currentUserId),
    getTopRatedGames(currentUserId),
    getMostPlayedGames(currentUserId),
    getNewestGames(currentUserId),
  ]);
  return {
    trending,
    topRated,
    mostPlayed,
    newestReleases,
  };
}
