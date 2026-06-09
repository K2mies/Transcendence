import {prisma} from "../src/config/db.js"

async function main() {
//Example profile
await prisma.user.upsert({
 where: { name: "evitaplays"},
 update: { },
 create: {
        name: "evitaplays",
        email: "evitaplays@example.com",
        password: "password",
        bio: "Hi there! Welcome to my gaming journal. I enjoy all kinds of games but I mainly gravitate towards games that give me a sense of escapism and immersion.",
        userGames: {
            create: [
            {
                game: { connect: { name: "World of Warcraft" }},
                gameStatus: "COMPLETED",
                favorite: true
            },
            {
                game: { connect: { name: "Overwatch" }},
                gameStatus: "PLAYING",
                favorite: true
            },
            {
                game: { connect: { name: "Journey" }},
                gameStatus: "COMPLETED",
                favorite: true
            },
            {
                game: { connect: { name: "Bloodborne" }},
                gameStatus: "DNF",
                favorite: false
            },
            {
                game: { connect: { name: "Firewatch" }},
                gameStatus: "WANT_TO_PLAY",
                favorite: false
            },
            ]
        },
        reviews: {
            create: [
            {
                game: { connect: { name: "World of Warcraft" }},
                rating: 5,
                review: "This game keeps blowing my mind, it's amazing, it's beautiful. I always come back to it..."
            },
            ]
        }
    }
})

  // ── 1. THE ZEN FARMER ──────────────────────────────────────
  // Cozy/casual gamer, mostly plays to unwind. Writes a lot.
  await prisma.user.upsert({
	where: { name: "mossy.saves"},
	update: { },
    create: {
      name: "mossy.saves",
      email: "mossy.saves@example.com",
      password: "password",
      bio: "Hi! I'm Mia 🌿 I play games to decompress after work, mostly slow-paced stuff where I can just exist for a while. Stardew Valley basically raised me. Currently working through my backlog one cozy evening at a time.",
      userGames: {
        create: [
          {
            game: { connect: { name: "Stardew Valley" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Journey" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "What Remains of Edith Finch" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Firewatch" } },
            gameStatus: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Ori and the Blind Forest" } },
            gameStatus: "PLAYING",
            favorite: false,
          },
          {
            game: { connect: { name: "Ori and the Will of the Wisps" } },
            gameStatus: "WANT_TO_PLAY",
            favorite: false,
          },
          {
            game: { connect: { name: "Limbo" } },
            gameStatus: "WANT_TO_PLAY",
            favorite: false,
          },
          {
            game: { connect: { name: "Celeste" } },
            gameStatus: "DNF",
            favorite: false,
          },
        ],
      },
    },
  });

  // ── 2. THE SOULS VETERAN ───────────────────────────────────
  // Hardcore, minimal bio, let the completed list speak.
  await prisma.user.upsert({
	where: { name: "ashenone_"},
	update: { },
    create: {
      name: "ashenone_",
      email: "ashenone_@example.com",
      password: "password",
      bio: "hello darkness my old friend",
      userGames: {
        create: [
          {
            game: { connect: { name: "Dark Souls" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Dark Souls III" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Bloodborne" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Elden Ring" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Sekiro: Shadows Die Twice" } },
            gameStatus: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Dark Souls II" } },
            gameStatus: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Hollow Knight" } },
            gameStatus: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Hollow Knight: Silksong" } },
            gameStatus: "WANT_TO_PLAY",
            favorite: false,
          },
        ],
      },
    },
  });

  // ── 3. THE NARRATIVE CHASER ────────────────────────────────
  // Plays for story and themes, writes mini-essays in their bio.
  await prisma.user.upsert({
	where: { name: "lore.and.lucia"},
	update: { },
    create: {
      name: "lore.and.lucia",
      email: "lore.and.lucia@example.com",
      password: "password",
      bio: "English lit grad who discovered that games can break your heart just as well as books can. I'm here for the writing, the characters, the moments that sit with you for weeks. Not super interested in gameplay mechanics for their own sake — if a game makes me feel something, it goes on the favourites shelf. Disco Elysium changed my life a little bit. Currently working through my RPG backlog and posting too many thoughts about it.",
      userGames: {
        create: [
          {
            game: { connect: { name: "Disco Elysium" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "The Last of Us" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "The Walking Dead" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Hellblade: Senua's Sacrifice" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Life is Strange" } },
            gameStatus: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Outer Wilds" } },
            gameStatus: "PLAYING",
            favorite: false,
          },
          {
            game: { connect: { name: "Baldur's Gate III" } },
            gameStatus: "WANT_TO_PLAY",
            favorite: false,
          },
          {
            game: { connect: { name: "Detroit: Become Human" } },
            gameStatus: "WANT_TO_PLAY",
            favorite: false,
          },
          {
            game: { connect: { name: "Heavy Rain" } },
            gameStatus: "DNF",
            favorite: false,
          },
        ],
      },
    },
  });

  // ── 4. THE MULTIPLAYER LURKER ──────────────────────────────
  // Only plays online games, barely touches their profile.
  await prisma.user.upsert({
	where: { name: "xKr4t0sx"},
	update: { },
    create: {
      name: "xKr4t0sx",
      email: "xkr4t0sx@example.com",
      password: "password",
      bio: "",
      userGames: {
        create: [
          {
            game: { connect: { name: "Counter-Strike: Global Offensive" } },
            gameStatus: "PLAYING",
            favorite: true,
          },
          {
            game: { connect: { name: "Dota 2" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "The Witcher 3: Wild Hunt" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Red Dead Redemption 2" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "God of War" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Portal 2" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Left 4 Dead 2" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Overwatch" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Titanfall 2" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Battlefield 3" } },
            gameStatus: "DNF",
            favorite: true,
          },
        ],
      },
    },
  });

  // ── 5. THE TROPHY HUNTER ───────────────────────────────────
  // PlayStation-loyal, obsessed with 100%-ing games, quite active.
  await prisma.user.upsert({
	where: { name: "platinum.petra"},
	update: { },
    create: {
      name: "platinum.petra",
      email: "platinum.petra@example.com",
      password: "password",
      bio: "Trophy hunter 🏆 | 47 platinums and counting. I play almost exclusively on PlayStation and I don't consider a game finished until I've seen every corner of it. Yes, I have the Hollow Knight 112% save file. No, I don't want to talk about the Radiant bosses. Currently power-levelling through my PS5 backlog before the next big release drops.",
      userGames: {
        create: [
          {
            game: { connect: { name: "God of War" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "God of War Ragnarök" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Bloodborne" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Marvel's Spider-Man" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Ghost of Tsushima" } },
            gameStatus: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Uncharted 4: A Thief's End" } },
            gameStatus: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Horizon Zero Dawn" } },
            gameStatus: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "The Last of Us Part II" } },
            gameStatus: "PLAYING",
            favorite: false,
          },
        ],
      },
    },
  });

  // ── 6. THE INDIE EXPLORER ──────────────────────────────────
  // Seeks out hidden gems, dislikes AAA bloat, very opinionated.
  await prisma.user.upsert({
	where: { name: "neon.felix"},
	update: { },
    create: {
      name: "neon.felix",
      email: "neon.felix@example.com",
      password: "password",
      bio: "I'm mostly here to shout about small games that deserve more love. Not really into 80-hour open worlds where you collect feathers or whatever. Give me a tight 5-hour experience that does one interesting thing brilliantly. Undertale, Hades, Return of the Obra Dinn — these are the games I think about in the shower. Recommend me stuff, I love a good tip.",
      userGames: {
        create: [
          {
            game: { connect: { name: "Undertale" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Hades" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Return of the Obra Dinn" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Inside" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Dead Cells" } },
            gameStatus: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Hotline Miami" } },
            gameStatus: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Clair Obscur: Expedition 33" } },
            gameStatus: "PLAYING",
            favorite: false,
          },
          {
            game: { connect: { name: "Disco Elysium" } },
            gameStatus: "WANT_TO_PLAY",
            favorite: false,
          },
          {
            game: { connect: { name: "Hollow Knight: Silksong" } },
            gameStatus: "WANT_TO_PLAY",
            favorite: false,
          },
          {
            game: { connect: { name: "The Stanley Parable" } },
            gameStatus: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Cyberpunk 2077" } },
            gameStatus: "DNF",
            favorite: false,
          },
        ],
      },
    },
  });

  // ── 7. THE WEEKEND CO-OP DAD ───────────────────────────────
  // Parent gamer, plays with family/friends, nostalgic but limited time.
  await prisma.user.upsert({
	where: { name: "daveplays_sometimes"},
	update: { },
    create: {
      name: "daveplays_sometimes",
      email: "daveplays_sometimes@example.com",
      password: "password",
      bio: "Dad of two, gamer since the 90s. I get maybe 4 hours a week if I'm lucky, so the backlog is basically a retirement plan at this point. Big on co-op — it's the only way I get to game guilt-free. Currently working through some older stuff I missed and replaying the Halo campaigns with my kid. Good times.",
      userGames: {
        create: [
          {
            game: { connect: { name: "Halo: Combat Evolved" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Halo 3" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "It Takes Two" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Portal 2" } },
            gameStatus: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Mario Kart 8 Deluxe" } },
            gameStatus: "PLAYING",
            favorite: false,
          },
          {
            game: { connect: { name: "Minecraft: Java Edition" } },
            gameStatus: "PLAYING",
            favorite: false,
          },
          {
            game: { connect: { name: "Left 4 Dead 2" } },
            gameStatus: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Baldur's Gate III" } },
            gameStatus: "WANT_TO_PLAY",
            favorite: false,
          },
          {
            game: { connect: { name: "Red Dead Redemption 2" } },
            gameStatus: "WANT_TO_PLAY",
            favorite: false,
          },
          {
            game: { connect: { name: "The Witcher 3: Wild Hunt" } },
            gameStatus: "DNF",
            favorite: false,
          },
        ],
      },
    },
  });
}

main()
   .catch((error) => {
     console.error(error);
     process.exitCode = 1;
   })
  .finally(() => prisma.$disconnect())
