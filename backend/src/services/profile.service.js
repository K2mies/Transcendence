import {prisma} from "../../prisma/client.js"

function filterGameInfo(games, status) //Also do we want to make profile helpers file?
{
	return games
	.filter(game => game.status === status)
	.map(g => ({
	id: g.game.id,
	name: g.game.name,
	image: g.game.image
	}))
}

/*
Fetch info from the user table by using id.
- In addition to the "basic/static user info" we may get, we also want to include the user's games (so all rows in UserGameRelation that belongs to user),
including more information on the game and platform
- We also want to include more information on their friends

-Previously, we also had include reviews and likereviews so then on the profile page we could showcase these are all the reviews written by the user
and all the reviews that the user has liked. This however feels more like nice to have!
reviews: true,
likeReviews: true,
*/
export async function getProfile(profileId)
{
	const user = await prisma.user.findUnique({
	where: { id: profileId },
	include: {
		userGames: {
			include: {
				game: true,
				platform: true,
			},
		},
		sentRequests: {
			include: {
				friend: true,
			},
		},
		receivedRequests: {
			include: {
				friend: true,
			},
		},
	},
	})
	console.log(JSON.stringify(user, null, 2))
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
		favourites: user.userGames
		.filter(game => game.favorite === true)
		.map(g => ({
		id: g.game.id,
		title: g.game.name,
		image: g.game.image
  		})),
		to_play: filterGameInfo(user.userGames, "WANT_TO_PLAY"),
		playing: filterGameInfo(user.userGames, "PLAYING"),
		completed: filterGameInfo(user.userGames, "COMPLETED"),
		dnf: filterGameInfo(user.userGames, "DNF"),
	}
}


