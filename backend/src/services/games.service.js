import { prisma } from "../config/db.js";

function splitQueryParam(value) {
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildRelationAndFilters(values, relationName, nestedRelationName) {
  return values.map((value) => ({
    [relationName]: {
      some: {
        name: value,
      },
    },
  }));
}

export async function getGames(query, currentUserId) {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;
  const skip = (page - 1) * limit;

  const search = query.search || "";
  const developer = query.developer || "";

  const platforms = splitQueryParam(query.platforms);
  const genres = splitQueryParam(query.genres);
  const modes = splitQueryParam(query.modes);

  const minRating = Number(query.minRating) || 0;

  let orderBy = { name: "asc" };

  switch (query.sortBy) {
    case "name-desc":
      orderBy = { name: "desc" };
      break;

    case "rating-desc":
      orderBy = { rating: "desc" };
      break;

    case "rating-asc":
      orderBy = { rating: "asc" };
      break;

    default:
      orderBy = { name: "asc" };
  }

  const where = {
    AND: [
      minRating > 0
        ? {
            rating: {
              gte: minRating,
            },
          }
        : {},
      search
        ? {
            name: {
              contains: search,
              mode: "insensitive",
            },
          }
        : {},

      developer
        ? {
            developer: {
              contains: developer,
              mode: "insensitive",
            },
          }
        : {},

      ...buildRelationAndFilters(platforms, "platforms"),
      ...buildRelationAndFilters(genres, "genres"),
      ...buildRelationAndFilters(modes, "modes"),
    ],
  };

  const [games, totalItems] = await Promise.all([
    prisma.game.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        platforms: true,
        genres: true,
        modes: true,
        userGames: true,
      },
    }),

    prisma.game.count({ where }),
  ]);

  const gamesWithFavorites = games.map((game) => {
    const userRelation = game.userGames.find(
      (ug) => ug.userId === Number(currentUserId),
    );

    return {
      ...game,
      favorite: userRelation?.favorite ?? false,
    };
  });

  return {
    games: gamesWithFavorites,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
}
