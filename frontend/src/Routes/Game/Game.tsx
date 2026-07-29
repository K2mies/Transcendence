import { useEffect, useState, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import Reviews from "../../Review/Reviews";
import FavoriteButton from "../../Rating/FavoriteButton";
import type { Game, GameStatus } from "../../Types/GameType";
import type { Review } from "../../Types/ReviewType";
import PlatformIcon from "../../Review/PlatformIcon";
import ModeIcon from "../../Review/ModeIcon";
import GenreIcon from "../../Review/GenreIcon";
import { MdOutlineDescription } from "react-icons/md";

type GameDataProps = {
  game: Game;
};

type StatusProps = {
  game: Game;
};

type GameInfoProps = {
  game: Game;
};

type GameProps = {
  myCurrUser: string | undefined;
};

function GameData({ game }: GameDataProps) {
  const temp = new Date(game.releaseDate);
  const released = temp.toLocaleDateString("fi-FI");

  return (
    <div className="text-primary text-sm ml-auto w-54">
      <p>
        <span className="font-bold">Developer:</span> {game.developer}
      </p>

      <p>
        <span className="font-bold">Released:</span> {released}
      </p>
    </div>
  );
}

async function updateGameRelation(
  gamename: string,
  newData: { gameStatus: GameStatus },
) {
  const name = encodeURIComponent(gamename);

  const response = await fetch(
    `http://localhost:4243/game/${name}/update-game-relation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newData),
    },
  );

  if (response.status === 200) {
    await response.json();
  } else {
    console.error("Error updating game relation");
  }
}

function Status({ game }: StatusProps) {
  const [currentStatus, setCurrentStatus] = useState<GameStatus>(
    game.gameStatus ?? "NONE",
  );

  function changeStatus(e: ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as GameStatus;

    setCurrentStatus(newStatus);

    updateGameRelation(game.name, {
      gameStatus: newStatus,
    });
  }

  return (
    <div className="inline-block">
      <label htmlFor="game-status" className="mr-3">
        Game status:
      </label>
      <select
        id="game-status"
        value={currentStatus || "NONE"}
        onChange={changeStatus}
      >
        <option value="NONE">None</option>
        <option value="WANT_TO_PLAY">Want to play</option>
        <option value="PLAYING">Playing</option>
        <option value="COMPLETED">Completed</option>
        <option value="DNF">Did not finish</option>
      </select>
    </div>
  );
}

function GameInfo({ game }: GameInfoProps) {
  const sortedPlatforms = [...game.platforms].sort((a, b) => {
    const order = [
      "Arcade",
      "Neo Geo AES",
      "Neo Geo MVS",

      "PlayStation",
      "PlayStation 2",
      "PlayStation 3",
      "PlayStation 4",
      "PlayStation 5",

      "PlayStation VR",
      "PlayStation VR2",

      "PlayStation Portable",
      "PlayStation Vita",
      "PSP",

      "Xbox",
      "Xbox 360",
      "Xbox One",
      "Xbox Series X|S",

      "Nintendo Entertainment System",
      "Super Nintendo Entertainment System",
      "Family Computer",
      "Satellaview",

      "Nintendo 64",
      "64DD",

      "Nintendo GameCube",

      "Wii",
      "Wii U",

      "Nintendo Switch",
      "Nintendo Switch 2",

      "Game Boy",
      "Game Boy Advance",
      "Gamy Boy Color",

      "Nintendo DSi",
      "Nintendo DS",
      "Nintendo 3DS",
      "New Nintendo 3DS",

      "PC (Microsoft Windows)",
      "PC-9800 Series",
      "FM Towns",
      "DOS",

      "Linux",

      "Mac",
      "Apple II",

      "iOS",
      "Android",

      "Windows Phone",
      "Windows Mixed Reality",
      "Legacy Mobile Device",

      "N-Gage",
      "Tapwave Zodiac",

      "Amiga",
      "Amiga CD32",

      "Atari ST/STE",
      "Atari Jaguar",

      "Commodore C64/128/MAX",

      "Oculus Quest",
      "Oculus Rift",

      "Meta Quest 2",
      "Meta Quest 3",

      "Steam VR",

      "Steam Deck",

      "Web browser",
      "OnLive Game System",
      "Ouya",

    const ia = order.indexOf(a);
    const ib = order.indexOf(b);

    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;

    return ia - ib;
  });
  return (
    <div className="flex flex-col ml-auto">
      <div className="bg-primary text-tertiary rounded-t-lg px-4 py-3">
        <div className="flex items-start gap-4">
          <ul
            className="flex-1 flex flex-wrap items-center gap-x-6 gap-y-2 text-tertiary"
            aria-label="Game is available on following platforms"
          >
            {sortedPlatforms.map((platform) => (
              <li
                key={platform}
                className="flex items-center gap-1 whitespace-nowrap list-none"
              >
                <span>{platform}</span>
                <PlatformIcon platform={platform} size={16} />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 shrink-0">
            <FavoriteButton game={game} />
            <Status key={game.name} game={game} />
          </div>
        </div>
      </div>
      <div className="bg-tertiary text-primary border-primary border-3 grid grid-cols-[auto_1fr] gap-x-8 p-4 rounded-b-lg">
        {/* Left column */}
        <img
          src={game.image}
          alt={game.name}
          className="row-span-2 rounded-xl border-5 border-primary"
        />

        {/* Top right */}
        <div className="flex items-start gap-8">
          <div className="flex-1 min-w-0">
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute top-1 right-2 text-secondary"
              >
                <MdOutlineDescription size={18} />
              </span>

              <p className="pr-8">
                <span className="font-bold">Description: </span>
                {game.description}
              </p>
            </div>
          </div>

          <GameData game={game} />
        </div>

        {/* Bottom right */}
        <div className="self-end mt-4">
          <p className="font-bold">Modes:</p>

          <div className="flex flex-wrap gap-3 mt-2">
            {game.modes.map((mode) => (
              <span
                key={mode}
                className="inline-flex items-center gap-1 rounded-full bg-primary text-tertiary px-3 py-1 whitespace-nowrap"
              >
                <span>{mode}</span>
                <ModeIcon mode={mode} size={16} />
              </span>
            ))}
          </div>

          <div className="mt-4">
            <p className="font-bold text-primary">Genres:</p>

            <div className="flex flex-wrap gap-3 mt-2">
              {game.genres.map((genre) => (
                <span
                  key={genre}
                  className="inline-flex items-center gap-1 rounded-full bg-secondary text-primary px-3 py-1 whitespace-nowrap"
                >
                  <span>{genre}</span>
                  <GenreIcon genre={genre} size={16} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Game({ myCurrUser }: GameProps) {
  const [game, setGame] = useState<Game | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const reviewAverage =
    reviews.length === 0
      ? 0
      : Math.round(
          (reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviews.length) *
            100,
        ) / 100;
  const [igdbRating, setIgdbRating] = useState(0);
  const [isGameFound, setIsGameFound] = useState<boolean | undefined>(
    undefined,
  );

  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    async function loadGame() {
      const response = await fetch(`http://localhost:4243/game/${name}`, {
        credentials: "include",
      });

      if (response.status === 200) {
        const res: Game = await response.json();

        setIsGameFound(true);
        setGame(res);
        setReviews(res.reviews ?? []);
        setIgdbRating(res.igdbRating);
      } else {
        setIsGameFound(false);
      }
    }

    if (name) {
      document.title = `${decodeURIComponent(name)} | GoodPlays`;
      loadGame();
    }
  }, [name]);

  async function deleteReview(review: Review) {
    if (!game) return;

    const response = await fetch(
      `http://localhost:4243/game/${encodeURIComponent(game.name)}/delete-review`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (response.ok) {
      setReviews((currentReviews) =>
        currentReviews.filter(
          (currentReview) => currentReview.id !== review.id,
        ),
      );
    }
  }
  return (
    <div className="bg-secondary text-primary min-h-screen p-6">
      {isGameFound && game && (
        <>
          <GameInfo game={game} />
          <Reviews
            key={game.name}
            gameName={game.name}
            gamePlatforms={game.platforms}
            reviews={reviews}
            setReviews={setReviews}
            onDeleteReview={deleteReview}
            reviewAverage={reviewAverage}
            rating={igdbRating}
            page="game"
            myCurrUser={myCurrUser}
          />
        </>
      )}

      {isGameFound === false && (
        <div>
          <p>404 Game not found</p>
        </div>
      )}
    </div>
  );
}

export default Game;
