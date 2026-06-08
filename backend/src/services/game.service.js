import {prisma} from "../config/db.js";

export async function getGame(gameName, currentUserId)
{
    const game = await prisma.game.findUnique({
    where: { name: gameName },
    include: {
      reviews: {
        include: {
          user: true,
        },
      },
	  userGames: true,
	  modes: true,
	  genres: true,
	  platforms: true,
    },
    })
	const isFave = game.userGames.find(ug => ug.userId === Number(currentUserId));
	let isFavorite;
	if (isFave === undefined)
		isFavorite = null;
	else
		isFavorite = isFave.favorite;
	const gameStatus = game.userGames.find(ug => ug.userId === Number(currentUserId));
	let myGameStatus;
	if (gameStatus === undefined)
		myGameStatus = null;
	else
		myGameStatus = gameStatus.status;
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
        reviews: game.reviews.map(r => ({
            id: r.id,
            rating: r.rating,
            review: r.review,
            user: {
                id: r.user.id,
                name: r.user.name,
            },
        })),
        modes: game.modes.map(m => m.name),
        genres: game.genres.map(g => g.name),
        platforms: game.platforms.map(p => p.name),
        favorite: isFavorite,
        status: myGameStatus,
    }
}
