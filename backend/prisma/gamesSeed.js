import { prisma } from "../src/config/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gamesPath = path.join(__dirname, "games.json");
const games = JSON.parse(fs.readFileSync(gamesPath, "utf-8"));

async function main() {
  console.log(`Seeding ${games.length} games...`);

  for (const g of games) {
    await prisma.game.upsert({
      where: { name: g.name }, // ⚠️ requires UNIQUE constraint on name
      update: {}, // no overwrite
      create: {
        name: g.name,
        imageSmall: g.imageSmall,
        imageBig: g.imageBig,
        description: g.description,
        releaseDate: new Date(g.releaseDate),
        updateDate: new Date(g.updateDate),
        developer: g.developer ?? null,
        publisher: g.publisher ?? null,
        rating: Number(g.rating) || 0,

        genres: {
          connectOrCreate: (g.genres || []).map((name) => ({
            where: { name },
            create: { name },
          })),
        },

        platforms: {
          connectOrCreate: (g.platforms || []).map((name) => ({
            where: { name },
            create: { name },
          })),
        },

        modes: {
          connectOrCreate: (g.modes || []).map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
    });
  }

  console.log("✔ Seed completed safely");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
