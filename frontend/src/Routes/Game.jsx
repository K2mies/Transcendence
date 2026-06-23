import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "../Reviews";
import FavoriteButton from "../Rating/FavoriteButton";

function GameData(props) {
  let temp = new Date(props.game.releaseDate);
  const released = temp.toLocaleDateString("fi-FI");
  temp = new Date(props.game.updateDate);
  const updated = temp.toLocaleDateString("fi-FI");
  return (
    <div className="text-primary text-sm ml-auto mr-10">
      <p>
        <span style={{ fontWeight: "bold" }}>Developer:</span>{" "}
        {props.game.developer}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Released:</span> {released}
      </p>
      <p>
        <span style={{ fontWeight: "bold" }}>Updated:</span> {updated}
      </p>
    </div>
  );
}

async function updateGameRelation(gamename, newData) {
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

function Status({ game }) {
  const [currentStatus, setCurrentStatus] = useState(game.gameStatus || "");
  const gamename = game.name;

  function changeStatus(e) {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    updateGameRelation(gamename, { gameStatus: newStatus });
  }
  return (
    <div className="flex flex-row">
      <select value={currentStatus} onChange={changeStatus}>
        <option value="" disabled>
          Choose status
        </option>
        <option value="WANT_TO_PLAY">Want to play</option>
        <option value="PLAYING">Playing</option>
        <option value="COMPLETED">Completed</option>
        <option value="DNF">Did not finish</option>
      </select>
    </div>
  );
}

function GameInfo(props) {
  return (
    <div className="flex flex-col ml-auto">
      <div className="bg-primary text-tertiary rounded-t-lg p-2">
        <div className="flex justify-between">
          <div className="flex">
            <h2 className="mr-20">{props.game.name}</h2>
            <FavoriteButton game={props.game} />
          </div>
          <Status key={props.game.name} game={props.game}></Status>
        </div>
        <div>
          <ul className="bg-tertiary text-primary flex flex-row gap-[3em] rounded-lg px-1">
            {props.game.platforms.map((platform) => (
              <li key={platform} className="list-none">
                <p>{platform}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-tertiary text-primary border-primary border-3 flex flex-row items-start gap-[2em] p-4 rounded-b-lg">
        <img
          src={props.game.image}
          alt={props.game.name}
          className="rounded-xl border-5 border-secondary"
        ></img>
        <div className="w-[55%]">
          <p>{props.game.description}</p>
          <div className="lg:flex my-3 gap-x-3 text-sm lg:text-center lg:items-center">
            {props.game.genres.map((genre) => (
              <p
                key={genre}
                className="lg:rounded-full lg:border-secondary lg:border-3 text-secondary lg:text-primary lg:p-2"
              >
                {genre}
              </p>
            ))}
            {props.game.modes.map((mode) => (
              <p
                key={mode}
                className="lg:rounded-full lg:border-primary lg:border-3 text-primary lg:p-2"
              >
                {mode}
              </p>
            ))}
          </div>
        </div>
        <GameData game={props.game}></GameData>
      </div>
    </div>
  );
}

function Game() {
  const [game, setGame] = useState({});
  const [reviews, setReviews] = useState([]);
  const [reviewAverage, setReviewAverage] = useState([]);
  const [rating, setRating] = useState({});
  const [isGameFound, setIsGameFound] = useState(undefined);
  const { name } = useParams();

  useEffect(() => {
    async function loadGame() {
      const response = await fetch(`http://localhost:4243/game/${name}`,
        {
          credentials: "include",
        },
	  );
      if (response.status === 200) {
        const res = await response.json();
        setIsGameFound(true);
        setGame(res);
        setReviews(res.reviews);
        setRating(res.rating);
        setReviewAverage(res.reviewAverage);
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
      {isGameFound && (
        <div>
          <GameInfo game={game} name={name}></GameInfo>
          <Reviews
            key={game.name}
            reviews={reviews}
            reviewAverage={reviewAverage}
            rating={rating}
            page="game"
          ></Reviews>
        </div>
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
