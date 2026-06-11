import {prisma} from "../src/config/db.js"

async function main() {
// REVIEWS
// mossy.saves - cozy, reflective, warm writing style
await prisma.review.upsert({
  where: { userId_gameId: { 
    userId: (await prisma.user.findUnique({ where: { name: "mossy.saves" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Stardew Valley" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "mossy.saves" }},
    game: { connect: { name: "Stardew Valley" }},
    rating: 5,
    review: "I don't think any game has ever made me feel more at peace. After a rough week, Stardew is where I go to just... breathe. There's something quietly magical about watching your farm grow season by season. It's not about winning. It's about showing up.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "mossy.saves" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Journey" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "mossy.saves" }},
    game: { connect: { name: "Journey" }},
    rating: 5,
    review: "Finished this in one sitting on a rainy Sunday and just sat there afterwards. No words. If you've never played it, don't look anything up — just go.",
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "mossy.saves" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "What Remains of Edith Finch" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "mossy.saves" }},
    game: { connect: { name: "What Remains of Edith Finch" }},
    rating: 5,
    review: "Genuinely one of the most affecting things I've experienced in any medium. The Lewis chapter especially — I had to put the controller down for a moment. Short, but it earns every minute.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "mossy.saves" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Firewatch" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "mossy.saves" }},
    game: { connect: { name: "Firewatch" }},
    rating: 4,
    review: "The atmosphere is stunning and I loved just existing in that forest. The story doesn't quite stick the landing for me, but the journey there is worth it. Delilah and Henry feel real in a way most game characters don't.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

// ashenone_ - terse, dry, lets the rating speak, occasional dark humour
await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "ashenone_" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Dark Souls" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "ashenone_" }},
    game: { connect: { name: "Dark Souls" }},
    rating: 5,
    review: "Still the one.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "ashenone_" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Elden Ring" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "ashenone_" }},
    game: { connect: { name: "Elden Ring" }},
    rating: 5,
    review: "FromSoft said 'what if Dark Souls but you can also touch grass' and somehow it worked.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "ashenone_" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Dark Souls II" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "ashenone_" }},
    game: { connect: { name: "Dark Souls II" }},
    rating: 4,
    review: "People are too mean about this one. ADP is a crime against humanity but the DLC bosses are some of the best in the series. It's fine.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "ashenone_" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Hollow Knight" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "ashenone_" }},
    game: { connect: { name: "Hollow Knight" }},
    rating: 5,
    review: "Absolute unit of a game for the price. Grimm Troupe nearly broke me. Recommended.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "ashenone_" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Sekiro: Shadows Die Twice" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "ashenone_" }},
    game: { connect: { name: "Sekiro: Shadows Die Twice" }},
    rating: 5,
    review: "Hardest FromSoft game. Also the most satisfying when it clicks. Isshin is a masterpiece of game design and I will die on this hill.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

// lore.and.lucia - essay mode, thoughtful, literary references, passionate
await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "lore.and.lucia" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Disco Elysium" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "lore.and.lucia" }},
    game: { connect: { name: "Disco Elysium" }},
    rating: 5,
    review: "I don't know how to write about this without sounding hyperbolic, so I'll just be honest: Disco Elysium is the most fully realised piece of writing I've encountered in any game. It treats failure as interesting, politics as genuinely complex, and its protagonist as both ridiculous and deeply human. The skill system as inner voices is inspired. I finished it and immediately wanted to start over.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "lore.and.lucia" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "The Last of Us" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "lore.and.lucia" }},
    game: { connect: { name: "The Last of Us" }},
    rating: 5,
    review: "What strikes me most is how restrained it is. Joel and Ellie's relationship builds so slowly, so honestly. The ending is morally complicated in a way most games don't dare to be. I've thought about the final scene many times since finishing it.",
    platform: { connect: { name: "PlayStation 3" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "lore.and.lucia" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Hellblade: Senua's Sacrifice" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "lore.and.lucia" }},
    game: { connect: { name: "Hellblade: Senua's Sacrifice" }},
    rating: 5,
    review: "Play with headphones. The binaural audio design alone deserves recognition. It's a short game but it uses every minute to do something the medium is uniquely positioned to do — put you inside a mind that experiences the world differently. Affecting and responsible in a way I didn't expect.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "lore.and.lucia" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "The Walking Dead" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "lore.and.lucia" }},
    game: { connect: { name: "The Walking Dead" }},
    rating: 5,
    review: "Lee and Clementine. That's the whole review. If you know, you know.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

// xKr4t0sx - blunt, short, ratings-heavy, not big on writing
await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "xKr4t0sx" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Counter-Strike: Global Offensive" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "xKr4t0sx" }},
    game: { connect: { name: "Counter-Strike: Global Offensive" }},
    rating: 5,
    review: "Best competitive shooter ever made. Still.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "xKr4t0sx" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "The Witcher 3: Wild Hunt" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "xKr4t0sx" }},
    game: { connect: { name: "The Witcher 3: Wild Hunt" }},
    rating: 5,
    review: "Did everything. Took forever. Worth it.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "xKr4t0sx" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Left 4 Dead 2" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "xKr4t0sx" }},
    game: { connect: { name: "Left 4 Dead 2" }},
    rating: 5,
    review: "2009 game still hits. The AI director is genius.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "xKr4t0sx" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Titanfall 2" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "xKr4t0sx" }},
    game: { connect: { name: "Titanfall 2" }},
    rating: 5,
    review: "The campaign is a masterclass. The multiplayer died because EA released it the same weekend as BF1 and CoD. Criminal.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

// platinum.petra - structured, thorough, PlayStation loyalty visible
await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "platinum.petra" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "God of War" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "platinum.petra" }},
    game: { connect: { name: "God of War" }},
    rating: 5,
    review: "Platinumed this twice — once on PS4 and again on PC when it launched there. The father-son dynamic carries an absurd amount of emotional weight for a game where you also cave in troll skulls. Santa Monica took a huge risk with the soft reboot and it paid off completely. The single unbroken camera shot is still impressive years later.",
    platform: { connect: { name: "PlayStation 4" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "platinum.petra" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Bloodborne" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "platinum.petra" }},
    game: { connect: { name: "Bloodborne" }},
    rating: 5,
    review: "The Chalice Dungeon platinum grind is genuinely not fun, I'll be honest. But everything else about this game is FromSoft at their most focused and atmospheric. Gascoigne is still one of the greatest boss introductions in gaming. PS4 exclusive and it should stay that way — it belongs to us.",
    platform: { connect: { name: "PlayStation 4" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "platinum.petra" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Ghost of Tsushima" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "platinum.petra" }},
    game: { connect: { name: "Ghost of Tsushima" }},
    rating: 4,
    review: "Beautiful game, satisfying platinum, maybe a touch too long in the open world department. The photo mode alone is worth installing. Sucker Punch did Japan more justice than most Japanese studios manage.",
    platform: { connect: { name: "PlayStation 4" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "platinum.petra" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Marvel's Spider-Man" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "platinum.petra" }},
    game: { connect: { name: "Marvel's Spider-Man" }},
    rating: 5,
    review: "Swinging through Manhattan never gets old. The platinum is very achievable if you're thorough as you go — don't leave the pigeons until the end, trust me. Insomniac gets Spider-Man in a way no studio has before.",
    platform: { connect: { name: "PlayStation 4" }}
  }
})

// neon.felix - opinionated, indie advocate, slightly contrarian about AAA
await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "neon.felix" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Undertale" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "neon.felix" }},
    game: { connect: { name: "Undertale" }},
    rating: 5,
    review: "Made by one person. Knows more about what games can be than most studios with hundreds of devs. The pacifist route is the obvious path but I'd argue the genocide route is the more interesting piece of game design — it punishes you for playing a certain way and that's remarkable.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "neon.felix" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Hades" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "neon.felix" }},
    game: { connect: { name: "Hades" }},
    rating: 5,
    review: "Supergiant figured out how to make narrative work in a roguelike and nobody's really matched it since. The writing is warm and funny and the gameplay loop is so tight it's almost annoying. 90 hours in and I'm still finding new dialogue.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "neon.felix" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Return of the Obra Dinn" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "neon.felix" }},
    game: { connect: { name: "Return of the Obra Dinn" }},
    rating: 5,
    review: "The most purely clever game I've ever played. The aesthetic is an immediate turn-off for some people and I get it, but push through — the deduction system is unlike anything else. That moment when it all starts clicking together is genuinely special.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "neon.felix" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Cyberpunk 2077" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "neon.felix" }},
    game: { connect: { name: "Cyberpunk 2077" }},
    rating: 3,
    review: "DNF. Not because it's broken anymore — the patches helped — but because it kept promising depth it never delivered. The world looks incredible and feels hollow. Night City is a beautiful empty set. Phantom Liberty is apparently better but I've moved on.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

// daveplays_sometimes - nostalgic, dad energy, co-op focus, warm
await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "daveplays_sometimes" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Halo: Combat Evolved" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "daveplays_sometimes" }},
    game: { connect: { name: "Halo: Combat Evolved" }},
    rating: 5,
    review: "This game defined my teenage years. Playing the campaign with my kid now and watching them experience it for the first time is something I didn't know I needed. The Library level is still terrible though. Some things are timeless.",
    platform: { connect: { name: "Xbox 360" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "daveplays_sometimes" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "It Takes Two" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "daveplays_sometimes" }},
    game: { connect: { name: "It Takes Two" }},
    rating: 5,
    review: "Played this with my wife over three weekends and it's genuinely one of the best gaming experiences I've had in years. Every chapter does something different and inventive. The elephant scene hit different. Mandatory for anyone who has a co-op partner.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "daveplays_sometimes" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Portal 2" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "daveplays_sometimes" }},
    game: { connect: { name: "Portal 2" }},
    rating: 5,
    review: "One of the funniest games ever written and also a legitimately brilliant puzzle game. The co-op mode especially — there's nothing quite like the moment a shared solution clicks. Still recommend this to everyone.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})

// evitaplays - already has one review, add a couple more
await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "evitaplays" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Journey" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "evitaplays" }},
    game: { connect: { name: "Journey" }},
    rating: 5,
    review: "No words needed. Just play it.",
    platform: { connect: { name: "PlayStation 4" }}
  }
})

await prisma.review.upsert({
  where: { userId_gameId: {
    userId: (await prisma.user.findUnique({ where: { name: "evitaplays" }})).id,
    gameId: (await prisma.game.findUnique({ where: { name: "Overwatch" }})).id
  }},
  update: {},
  create: {
    user: { connect: { name: "evitaplays" }},
    game: { connect: { name: "Overwatch" }},
    rating: 4,
    review: "Peak Overwatch was genuinely one of the most fun multiplayer experiences I've had. The character design is brilliant and every hero feels distinct. It's gone downhill since but the original magic was real.",
    platform: { connect: { name: "PC (Microsoft Windows)" }}
  }
})
}

main()
   .catch((error) => {
     console.error(error);
     process.exitCode = 1;
   })
  .finally(() => prisma.$disconnect())