import { useEffect, useState } from "react";

function TestGame() {
	const [games, setGames] = useState([]);

	useEffect(() => {
		async function loadGames() {
			const response = await fetch("http://localhost:4243/testgame?rating=4.9");
			const res = await response.json();
			if (res.status == 404) {
				return (
					<div>
						<p>Not found!</p>
					</div>
				);
			}
			setGames(res);
		}

		loadGames();
	}, []);

	return (
		<div>
			{games.map((game) => (
				<p>{game.name}</p>
			))}
		</div>
	);
}

export default TestGame;
