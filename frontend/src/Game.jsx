import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GameInfo(props) {
	return (
		<div className="user-info">
			<div className="user-header">
				<h2>{props.game.name}</h2>
				<p>{props.game.rating}</p>
			</div>
			<div className="user-content">
				<img src={props.game.image} alt={props.game.name}></img>
				<p>{props.game.description}</p>
			</div>
		</div>
	);
}

function DisplayGame() {
	const [game, setGame] = useState({});
	const [isGameFound, setIsGameFound] = useState(undefined);
	const { name } = useParams();

	useEffect(() => {
		async function loadGame() {
			const response = await fetch(`http://localhost:4243/game/${name}`);
			if (response.status === 200) {
				const res = await response.json();
				setIsGameFound(true);
				setGame(res);
			} else {
				setIsGameFound(false);
			}
		}

		loadGame();
	}, []);
	return (
		<div>
			{isGameFound &&
			<div>
				<GameInfo game={game}></GameInfo>
			</div>}
			{isGameFound === false &&
			<div>
				<p>404 Game not found</p>
			</div>}
		</div>
	)
}

export default DisplayGame;
