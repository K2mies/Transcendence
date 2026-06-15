import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function GameData(props) {
  let temp = new Date(props.game.releaseDate);
  const released = temp.toLocaleDateString("fi-FI");
  temp = new Date(props.game.updateDate);
  const updated = temp.toLocaleDateString("fi-FI");
  return (
    <div className="text-primary text-[75%] ml-auto mr-10">
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
      {props.game.genres.length > 0 && (
        <p style={{ fontWeight: "bold" }}>Genres: </p>
      )}
      {props.game.genres.map((genre) => (
        <p key={genre}>{genre}</p>
      ))}
      {props.game.modes.length > 0 && (
        <p style={{ fontWeight: "bold" }}>Modes: </p>
      )}
      {props.game.modes.map((mode) => (
        <p key={mode}>{mode}</p>
      ))}
    </div>
  );
}

async function UpdateGameRelation(gamename, newData) {
  const response = await fetch(
    `http://localhost:4243/game/${gamename}/update-game-relation`,
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

function Favorite({ game }) {
  const [favoriteState, setFavoriteState] = useState(game.favorite || "");
  const gamename = game.name;

  function changeValue() {
    const newValue = !game.favorite;
    setFavoriteState(newValue);
    UpdateGameRelation(gamename, { favorite: newValue });
  }
  return (
    <>
      <button onClick={changeValue}>
        {favoriteState ? <FaHeart /> : <FaRegHeart />}
      </button>
    </>
  );
}

function Status({ game }) {
  const [currentStatus, setCurrentStatus] = useState(game.gameStatus || "");
  const gamename = game.name;

  function changeStatus(e) {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    UpdateGameRelation(gamename, { gameStatus: newStatus });
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
            <Favorite key={props.game.name} game={props.game}></Favorite>
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
        <p className="w-[45%]">{props.game.description}</p>
        <GameData game={props.game}></GameData>
      </div>
    </div>
  );
}

function Game() {
  const [game, setGame] = useState({});
  const [reviews, setReviews] = useState([]);
  const [reviewAverage, setReviewAverage] = useState({});
  const [isGameFound, setIsGameFound] = useState(undefined);
  const { name } = useParams();

  useEffect(() => {
    if (!name) return;
    async function loadGame() {
      const response = await fetch(`http://localhost:4243/game/${name}`, {
        credentials: "include",
      });
      if (response.status === 200) {
        const res = await response.json();
        setIsGameFound(true);
        setGame(res);
        setReviews(res.reviews);
        setReviewAverage(res.reviewAverage);
      } else {
        setIsGameFound(false);
      }
    }

    loadGame();
  }, [name]);
  return (
    <div className="bg-secondary text-primary min-h-screen p-6">
      {isGameFound && (
        <div>
          <GameInfo game={game} name={name}></GameInfo>
          <Reviews
            key={game}
            reviews={reviews}
            average={reviewAverage}
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
