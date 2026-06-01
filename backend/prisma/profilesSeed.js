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
                platform: { connect: { name: "PC (Microsoft Windows)" }},
                status: "COMPLETED",
                favorite: true
            },
            {
                game: { connect: { name: "Overwatch" }},
                platform: { connect: { name: "PC (Microsoft Windows)" }},
                status: "PLAYING",
                favorite: true
            },
            {
                game: { connect: { name: "Journey" }},
                platform: { connect: { name: "PlayStation 4" }},
                status: "COMPLETED",
                favorite: true
            },
            {
                game: { connect: { name: "Bloodborne" }},
                platform: { connect: { name: "PlayStation 4" }},
                status: "DNF",
                favorite: false
            },
            {
                game: { connect: { name: "Firewatch" }},
                status: "WANT_TO_PLAY",
                favorite: false
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
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Journey" } },
            platform: { connect: { name: "PlayStation 4" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "What Remains of Edith Finch" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Firewatch" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Ori and the Blind Forest" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "PLAYING",
            favorite: false,
          },
          {
            game: { connect: { name: "Ori and the Will of the Wisps" } },
            status: "WANT_TO_PLAY",
            favorite: false,
          },
          {
            game: { connect: { name: "Limbo" } },
            status: "WANT_TO_PLAY",
            favorite: false,
          },
          {
            game: { connect: { name: "Celeste" } },
            platform: { connect: { name: "Nintendo Switch" } },
            status: "DNF",
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
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Dark Souls III" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Bloodborne" } },
            platform: { connect: { name: "PlayStation 4" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Elden Ring" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Sekiro: Shadows Die Twice" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Dark Souls II" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Hollow Knight" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Hollow Knight: Silksong" } },
            status: "WANT_TO_PLAY",
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
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "The Last of Us" } },
            platform: { connect: { name: "PlayStation 4" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "The Walking Dead" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Hellblade: Senua's Sacrifice" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Life is Strange" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Outer Wilds" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "PLAYING",
            favorite: false,
          },
          {
            game: { connect: { name: "Baldur's Gate III" } },
            status: "WANT_TO_PLAY",
            favorite: false,
          },
          {
            game: { connect: { name: "Detroit: Become Human" } },
            status: "WANT_TO_PLAY",
            favorite: false,
          },
          {
            game: { connect: { name: "Heavy Rain" } },
            platform: { connect: { name: "PlayStation 4" } },
            status: "DNF",
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
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "PLAYING",
            favorite: true,
          },
          {
            game: { connect: { name: "Dota 2" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "The Witcher 3: Wild Hunt" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Red Dead Redemption 2" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "God of War" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Portal 2" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Left 4 Dead 2" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Overwatch" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Titanfall 2" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Battlefield 3" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "DNF",
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
            platform: { connect: { name: "PlayStation 4" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "God of War Ragnarök" } },
            platform: { connect: { name: "PlayStation 5" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Bloodborne" } },
            platform: { connect: { name: "PlayStation 4" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Marvel's Spider-Man" } },
            platform: { connect: { name: "PlayStation 4" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Ghost of Tsushima" } },
            platform: { connect: { name: "PlayStation 4" } },
            status: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Uncharted 4: A Thief's End" } },
            platform: { connect: { name: "PlayStation 4" } },
            status: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Horizon Zero Dawn" } },
            platform: { connect: { name: "PlayStation 4" } },
            status: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "The Last of Us Part II" } },
            platform: { connect: { name: "PlayStation 4" } },
            status: "PLAYING",
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
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Hades" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Return of the Obra Dinn" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Inside" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Dead Cells" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Hotline Miami" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Clair Obscur: Expedition 33" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "PLAYING",
            favorite: false,
          },
          {
            game: { connect: { name: "Disco Elysium" } },
            status: "WANT_TO_PLAY",
            favorite: false,
          },
          {
            game: { connect: { name: "Hollow Knight: Silksong" } },
            status: "WANT_TO_PLAY",
            favorite: false,
          },
          {
            game: { connect: { name: "The Stanley Parable" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Cyberpunk 2077" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "DNF",
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
            platform: { connect: { name: "Xbox" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Halo 3" } },
            platform: { connect: { name: "Xbox 360" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "It Takes Two" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Portal 2" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: true,
          },
          {
            game: { connect: { name: "Mario Kart 8 Deluxe" } },
            platform: { connect: { name: "Nintendo Switch" } },
            status: "PLAYING",
            favorite: false,
          },
          {
            game: { connect: { name: "Minecraft: Java Edition" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "PLAYING",
            favorite: false,
          },
          {
            game: { connect: { name: "Left 4 Dead 2" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "COMPLETED",
            favorite: false,
          },
          {
            game: { connect: { name: "Baldur's Gate III" } },
            status: "WANT_TO_PLAY",
            favorite: false,
          },
          {
            game: { connect: { name: "Red Dead Redemption 2" } },
            status: "WANT_TO_PLAY",
            favorite: false,
          },
          {
            game: { connect: { name: "The Witcher 3: Wild Hunt" } },
            platform: { connect: { name: "PC (Microsoft Windows)" } },
            status: "DNF",
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
