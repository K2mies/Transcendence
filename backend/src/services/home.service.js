import { prisma } from "../config/db.js";

async function getNewestGames()
{
    const newestGames = await prisma.game.findMany({
        select: {
            id: true,
            name: true,
            imageSmall: true,
        },
        take: 30,
        orderBy: { releaseDate: 'desc' },})
        return newestGames.map(g=> ({
            id: g.id,
            name: g.name,
            image: g.imageSmall
        }))
}

async function getTopRatedGames()
{
    const games = await prisma.game.findMany({
        select: {
            id: true,
            name: true,
            imageSmall: true,
            reviews: {
                select: { rating: true }
        }
        }
    })
    const topRated = games
        .map(g => {
        let sum = 0;
        for (let i = 0; i < g.reviews.length; i++)
            sum += g.reviews[i].rating;
            let average = null
        if (g.reviews.length !== 0)
            average = sum / g.reviews.length
        return {
            id: g.id,
            name: g.name,
            image: g.imageSmall,
            average: average
        }
        })
        .sort((a, b) => b.average - a.average)
        .slice(0, 30)
        return topRated;
}

async function getMostPlayedGames()
{
    const games = await prisma.game.findMany({
        select: {
            id: true,
            name: true,
            imageSmall: true,
            userGames: {
                select: { gameStatus: true },
                where: {
                gameStatus: { in: ["PLAYING", "COMPLETED"] }
                }
            }
        }
    })
    const mostPlayed = games
        .map(g => ({
            id: g.id,
            name: g.name,
            image: g.imageSmall,
            count: g.userGames.length
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 30)
        return mostPlayed;
}

//reviews:
//select: { createdAt: true },
//where: { createdAt: { gte: oneMonthAgo }}
//select: { createdAt: true, favorite: true, gameStatus: true },
//where: { createdAt: { gte: oneMonthAgo }} once you update prisma!
async function getTrendingGames()
{
    const oneMonthAgo = new Date()
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30)
    const games = await prisma.game.findMany({
        select: {
            id: true,
            name: true,
            imageSmall: true,
            reviews: true,
            userGames: {
            select: { favorite: true, gameStatus: true },
        }
    }
    })

    const trending = games
        .map(g => ({
            id: g.id,
            name: g.name,
            image: g.imageSmall,
            traction: g.reviews.length + g.userGames.filter(ug => ug.gameStatus !== null).length + g.userGames.filter(ug => ug.favorite === true).length,
        }))
        .sort((a, b) => b.traction - a.traction)
        .slice(0, 30)
        return trending;
}

export async function getHome(profileName) {
    const [trending, topRated, mostPlayed, newestReleases] = await Promise.all([
        getTrendingGames(),
        getTopRatedGames(),
        getMostPlayedGames(),
        getNewestGames(),
    ]);
    return {
        trending,
        topRated,
        mostPlayed,
        newestReleases,
    };
}