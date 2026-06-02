import {prisma} from "../config/db.js";

function filterGameInfo(games, status)
{
	return games
	.filter(game => game.status === status)
	.map(g => ({
	id: g.game.id,
	name: g.game.name,
	image: g.game.imageSmall
	}))
}

export async function getProfile(profileName)
{
	const user = await prisma.user.findUnique({
	where: { name: profileName },
	select: {
		id: true,
		name: true,
		bio: true,
		userGames: {
			select: {
				status: true,
				favorite: true,
				game: {
					select: {
						id: true,
						name: true,
						imageSmall: true,
					},
				},
				platform: {
					select: {
						name: true,
					},
				},
			},
		},
		sentRequests: {
			select: {
				friend: true,
			},
		},
		receivedRequests: {
			include: {
				friend: true,
			},
		},
		reviews: {
			select: {
				game: {
					select: {
						name: true,
					},
				},
				rating: true,
				review: true,
			},
		},
	},
	})
	return {
		id: user.id,
		name: user.name,
		bio: user.bio,
		friends : [ //... combines these into one array
			...user.receivedRequests
			.filter(f => f.status === "FRIENDS")
			.map(f => ({
			id: f.friend.id,
			name: f.friend.name
		})),
			...user.sentRequests
			.filter(f => f.status === "FRIENDS")
			.map(f => ({
			id: f.friend.id,
			name: f.friend.name
		})),
		],
		favorites: user.userGames
		.filter(game => game.favorite === true)
		.map(g => ({
		id: g.game.id,
		name: g.game.name,
		image: g.game.imageSmall
  		})),
		to_play: filterGameInfo(user.userGames, "WANT_TO_PLAY"),
		playing: filterGameInfo(user.userGames, "PLAYING"),
		completed: filterGameInfo(user.userGames, "COMPLETED"),
		dnf: filterGameInfo(user.userGames, "DNF"),
		reviews: user.reviews.map(r => ({
            id: r.id,
			game: r.game.name,
            rating: r.rating,
            review: r.review,
        })),
	}
}

export async function updateProfile(profileName, newData)
{
	const existingUser = await prisma.user.findUnique({ where: { name: newData.name}})
	if (existingUser && existingUser.name != profileName)
	{
		throw "Username already taken"
	}
	const updateUser = await prisma.user.update({
	where: { name: profileName },
	data: {
	name: newData.name,
	bio: newData.bio
	},
	});
	return updateUser
}
