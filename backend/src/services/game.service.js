import {prisma} from "../config/db.js";

export async function getGame(gameName, currentUserId)
{
	const game = await prisma.game.findUnique({
	where: { name: gameName },
	include: {
		reviews: {
		include: {
			user: true,
			platform: true,
		},
		},
		userGames: true,
		modes: true,
		genres: true,
		platforms: true,
	},
	})
	if (!game) {
		const error = new Error("Game not found");
		error.status = 404;
		throw error;
	}
	const userRelation = game.userGames.find(ug => ug.userId === Number(currentUserId))
	let sum = 0;
	for (let i = 0; i < game.reviews.length; i++)
	{
		sum += game.reviews[i].rating;
	}
	let averageResult = null
	if (game.reviews.length != 0)
		averageResult = sum / game.reviews.length;
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
			platform: r.platform?.name,
			user: {
				id: r.user.id,
				name: r.user.name,
			},
		})),
		reviewAverage: averageResult,
		modes: game.modes.map(m => m.name),
		genres: game.genres.map(g => g.name),
		platforms: game.platforms.map(p => p.name),
		favorite: userRelation?.favorite ?? null,
		gameStatus: userRelation?.gameStatus ?? null
	}
}

export async function updateGameRelation(userId, newData, gameName)
{
	const game = await prisma.game.findUnique({ where: { name: gameName }})
	if (!game)
	{
		const error = new Error("Game not found")
		error.status = 404
		throw error
	}
	await prisma.userGameRelation.upsert({
		where: {
			userId_gameId: {
				userId: userId,
				gameId: game.id
			}
		},
		update: {
			gameStatus: newData.gameStatus,
			favorite: newData.favorite
		},
		create: {
			userId: userId,
			gameId: game.id,
			gameStatus: newData.gameStatus,
			favorite: newData.favorite
		}
	})
}

export async function addReview(userId, newData, gameName)
{
	const game = await prisma.game.findUnique({ where: { name: gameName }})
	if (!game)
	{
		const error = new Error("Game not found")
		error.status = 404
		throw error
	}
	const platform = await prisma.platform.findUnique({ where: { name: newData.platform }})
	await prisma.review.upsert({
		where: { userId_gameId: { userId: userId, gameId: game.id }},
		update: {
			review: newData.review,
			rating: newData.rating,
			platformId: platform?.id
		},
		create: {
			gameId: game.id,
			userId: userId,
			review: newData.review,
			rating: newData.rating,
			platformId: platform?.id
		}
	})
}

export async function deleteReview(userId, gameName)
{
	const game = await prisma.game.findUnique({ where: { name: gameName }})
	if (!game)
	{
		const error = new Error("Game not found")
		error.status = 404
		throw error
	}
	await prisma.review.delete({
	where: { userId_gameId: { userId: userId, gameId: game.id}},
	});
}
