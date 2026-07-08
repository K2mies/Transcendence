import { useEffect, useState, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import Reviews from "../Reviews";
import FavoriteButton from "../Rating/FavoriteButton";
import type { Game, Review, GameStatus } from "../Types/GameType";

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
    <div className="text-primary text-sm ml-auto mr-10">
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

        <div>
          <ul className="bg-tertiary text-primary flex flex-row gap-[3em] rounded-lg px-1">
            {game.platforms.map((platform) => (
              <li key={platform} className="list-none">
                <p>{platform}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-tertiary text-primary border-primary border-3 flex flex-row items-start gap-[2em] p-4 rounded-b-lg">
        <img
          src={game.image}
          alt={game.name}
          className="rounded-xl border-5 border-secondary"
        />

        <div className="w-[55%]">
          <p>{game.description}</p>

          <div className="lg:flex my-3 gap-x-3 text-sm lg:text-center lg:items-center">
            {game.genres.map((genre) => (
              <p
                key={genre}
                className="lg:rounded-full lg:border-secondary lg:border-3 text-secondary lg:text-primary lg:p-2"
              >
                {genre}
              </p>
            ))}

            {game.modes.map((mode) => (
              <p
                key={mode}
                className="lg:rounded-full lg:border-primary lg:border-3 text-primary lg:p-2"
              >
                {mode}
              </p>
            ))}
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
  const [reviewAverage, setReviewAverage] = useState(0);
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
        setReviewAverage(res.reviewAverage ?? 0);
      } else {
        setIsGameFound(false);
      }
    }

    if (name) {
      loadGame();
    }
  }, [name]);

  return (
    <div className="bg-secondary text-primary min-h-screen p-6">
      {isGameFound && game && (
        <>
          <GameInfo game={game} />

          <Reviews
            key={game.name}
            reviews={reviews}
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
