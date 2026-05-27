import {prisma} from "../config/db.js";

export async function getGame(gameName)
{
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
					userId: true,
					review: true,
					rating: true,
				}
			},
			modes: {
				select: {
					id: true,
					name: true,
				}
			},
			genres: {
				select: {
					id: true,
					name: true,
				}
			},
			platforms: {
				select: {
					id: true,
					name: true,
				}
			},
		}
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
		reviews: game.reviews,
		modes: game.modes,
		genres: game.genres,
		platforms: game.platforms
	}
}
