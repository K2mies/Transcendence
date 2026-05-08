import {PrismaClient} from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

const games = JSON.parse(fs.readFileSync("./prisma/games.json", "utf-8"));

async function main() {
	console.log(`Seeding ${games.length} games...`);

	for (const g of games) {
		const created = await prisma.game.create({
			data: {
				name: g.name,
				imageSmall: g.imageSmall,
				imageBig: g.imageBig,
				description: g.description,
				releaseDate: new Date(g.releaseDate),
				updateDate: new Date(g.updateDate),
				developer: g.developer || "",
				publisher: g.publisher || "",
				rating: Number(g.rating) || 0,
				genres: {
					connectOrCreate: (g.genres || []).map((name) => ({
						where: {name},
						create: {name},
					})),
				},
				platforms: {
					connectOrCreate: (g.platforms || []).map((name) => ({
						where: {name},
						create: {name},
					})),
				},
				modes: {
					connectOrCreate: (g.modes || []).map((name) => ({
						where: {name},
						create: {name},
					})),
				},
			},
		});
		console.log(`Inserted: ${created.name}`);
	}
	console.log("DONE: games.json seeded.")
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
