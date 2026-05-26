import {prisma} from "../config/db.js";

export async function getGame(gameName)
{
	const game = await prisma.game.findUnique({
	where: { name: gameName },
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
	}
}
