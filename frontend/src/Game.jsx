import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews";

function GameInfo(props) {
  return (
    <div className="user-game-info">
      <div className="user-game-header">
        <h2>{props.game.name}</h2>
        <div>
          <ul className="platform-items">
            {props.game.platforms.map((platform) => (
              <li key={platform.id} className="platform-item">
                <p>{platform.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="user-game-content">
        <img src={props.game.image} alt={props.game.name}></img>
        <p>{props.game.description}</p>
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
	          <Reviews reviews={reviews}></Reviews>
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
