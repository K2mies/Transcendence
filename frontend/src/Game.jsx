import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews";

function GameData(props) {
  let temp = new Date(props.game.releaseDate);
  const released = temp.toLocaleDateString("fi-FI");
  temp = new Date(props.game.updateDate);
  const updated = temp.toLocaleDateString("fi-FI");
  return (
    <div className="text-[75%]">
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
        <p>{genre}</p>
      ))}
      {props.game.modes.length > 0 && (
        <p style={{ fontWeight: "bold" }}>Modes: </p>
      )}
      {props.game.modes.map((mode) => (
        <p>{mode}</p>
      ))}
    </div>
  );
}

function GameInfo(props) {
  return (
    <div className="flex flex-col gap-[1em]">
      <div className="mr-[2em]">
        <h2>{props.game.name}</h2>
        <div>
          <ul className="flex flex-row gap-[3em]">
            {props.game.platforms.map((platform) => (
              <li className="list-none">
                <p>{platform}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-row items-start gap-[2em]">
        <img src={props.game.image} alt={props.game.name}></img>
        <p className="w-[45%]">{props.game.description}</p>
        <GameData game={props.game}></GameData>
      </div>
    </div>
  );
}

function DisplayGame() {
  const [game, setGame] = useState({});
  const [reviews, setReviews] = useState([]);
  const [isGameFound, setIsGameFound] = useState(undefined);
  const { name } = useParams();

  useEffect(() => {
    async function loadGame() {
      const response = await fetch(`http://localhost:4243/game/${name}`);
      if (response.status === 200) {
        const res = await response.json();
        setIsGameFound(true);
        setGame(res);
        if (res.reviews.length > 0) setReviews(res.reviews);
      } else {
        setIsGameFound(false);
      }
    }

    loadGame();
  }, []);
  return (
    <div>
      {isGameFound && (
        <div>
          <GameInfo game={game}></GameInfo>
          {reviews.length > 0 && (
            <Reviews reviews={reviews} page="game"></Reviews>
          )}
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

export default DisplayGame;
