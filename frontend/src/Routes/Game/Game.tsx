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
  let temp = new Date(game.releaseDate);
  const released = temp.toLocaleDateString("fi-FI");

  temp = new Date(game.updateDate);
  const updated = temp.toLocaleDateString("fi-FI");

  return (
    <div className="text-primary text-sm ml-auto mr-10 w-34">
      <p>
        <span className="font-bold">Developer:</span> {game.developer}
      </p>

      <p>
        <span className="font-bold">Released:</span> {released}
      </p>

      <p>
        <span className="font-bold">Updated:</span> {updated}
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
  const [currentStatus, setCurrentStatus] = useState(game.gameStatus);

  function changeStatus(e: ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as GameStatus;

    setCurrentStatus(newStatus);

    updateGameRelation(game.name, {
      gameStatus: newStatus,
    });
  }

  return (
    <div className="flex flex-row">
      <select value={currentStatus} onChange={changeStatus}>
        <option value="NONE">Choose status</option>
        <option value="WANT_TO_PLAY">Want to play</option>
        <option value="PLAYING">Playing</option>
        <option value="COMPLETED">Completed</option>
        <option value="DNF">Did not finish</option>
      </select>
    </div>
  );
}

function GameInfo({ game }: GameInfoProps) {
  return (
    <div className="flex flex-col ml-auto">
      <div className="bg-primary text-tertiary rounded-t-lg p-2">
        <div className="flex justify-between">
          <div className="flex p-2">
            <FavoriteButton game={game} />
          </div>
          <Status key={game.name} game={game} />
        </div>
      </div>
      <div>
        <ul className="bg-primary flex flex-wrap items-center gap-x-6 gap-y-2 px-4 pb-2 text-tertiary">
          {game.platforms.map((platform) => (
            <li
              key={platform}
              className="flex items-center gap-1 whitespace-nowrap list-none"
            >
              <span>{platform}</span>
              <PlatformIcon platform={platform} size={16} />
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-tertiary text-primary border-primary border-3 flex flex-row items-start gap-[2em] p-4 rounded-b-lg">
        <img
          src={game.image}
          alt={game.name}
          className="rounded-xl border-5 border-secondary"
        />

        <div className="flex-1 min-w-0">
          <div className="relative">
            <label className="absolute top-2 right-2 text-secondary bg-tertiary px-2 font-bold">
              <MdOutlineDescription className="text-secondary" size={18} />
            </label>

            <p className="border-3 rounded-lg border-secondary p-6">
              <label className="font-bold">Description: </label>
              {game.description}
            </p>
          </div>
          <div className="my-3 mb-3">
            <label className="font-bold">Modes:</label>
            <div className="flex flex-wrap gap-3">
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

            <div className="mt-3">
              <label className="font-bold text-secondary">Genres:</label>
              <div className="flex flex-wrap gap-3 mb-3">
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

        <GameData game={game} />
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
  const [rating, setRating] = useState(0);
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
        setRating(res.rating);
      } else {
        setIsGameFound(false);
      }
    }

    if (name) {
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
            rating={rating}
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
