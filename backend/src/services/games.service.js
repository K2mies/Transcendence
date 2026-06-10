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

export async function getGames(query) {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;
  const skip = (page - 1) * limit;

  const search = query.search || "";
  const developer = query.developer || "";

  const platforms = splitQueryParam(query.platforms);
  const genres = splitQueryParam(query.genres);
  const modes = splitQueryParam(query.modes);

  const where = {
    AND: [
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
      orderBy: {
        name: "asc",
      },
      include: {
        platforms: true,
        genres: true,
        modes: true,
      },
    }),

    prisma.game.count({ where }),
  ]);

  return {
    games,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  };
}
