import {prisma} from "../../prisma/client.js"

export async function getProfile(profileId)
{
	const user = await prisma.user.findUnique({ //Go to the User Table and find exactly one row!
	where: { id: profileId }, //I expect that we get the id info from frontend..?
	include: { //Don't just give the basic user info but bring related data! (Without include, we would only get id name and bio, all the STATIC info)
		userGames: { //Include all rows in UserGameRelation that belong to this user
		include: {
			game: true, //instead of just giving me gameid, fetch full game object (so instead of gameId5, we get game id, title image)
			platform: true, //same goes here, we get the platform name rather than only the id!
		},
		},
		sentRequests: true,
		receivedRequests: true,
		reviews: true, //give me all reviews written by this user... this is kinda nice to have, I dont know if we want "my reviews" section there
		likeReviews: true, //same goes here.. not maybe necessary here
		},
	})
	console.log(JSON.stringify(user, null, 2))
	return {
		id: user.id,
		name: user.name,
		bio: user.bio,
		friends : [
			...user.receivedRequests.filter(f => f.status === "FRIENDS"), //using the spread operator ... it gets combined into one array
			...user.sentRequests.filter(f => f.status === "FRIENDS") // perhaps we want to fetch both id and name?
		],
		favourites: user.userGames
		.filter(game => game.favorite === true) //For these view, we probably want to only see the title and the image of the game!
		.map(g => ({
		title: g.game.name,
		image: g.game.image
  		})),
		to_play: user.userGames
		.filter(game => game.status === "WANT_TO_PLAY") //can we have a helper function for these as they are doing the same...
		.map(g => ({
		title: g.game.name,
		image: g.game.image
		})),
		playing: user.userGames
		.filter(game => game.status === "PLAYING")
		.map(g => ({
		title: g.game.name,
		image: g.game.image
		})),
		completed: user.userGames
		.filter(game => game.status === "COMPLETED")
		.map(g => ({
		title: g.game.name,
		image: g.game.image
		})),
		dnf: user.userGames
		.filter(game => game.status === "DNF")
		.map(g => ({
		title: g.game.name,
		image: g.game.image
		})),
		}
	console.log(JSON.stringify(user, null, 2))

}

