import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DisplayProfile() {
	const [profile, setProfile] = useState({});
	const [favGames, setFavGames] = useState([]);
	const { username } = useParams();

	useEffect(() => {
		async function loadProfile() {
			const response = await fetch(`http://localhost:4243/profile?name=${username}`);
			const res = await response.json();
			if (res.status == 404) {
				return (
					<div>
						<p>Not found!</p>
					</div>
				);
			}
			setProfile(res);
			setFavGames(res.userGames);
		}

		loadProfile();
	}, []);

	return (
		<div>
			<div className="user-info">
				<h2 className="user-header">{profile.name}</h2>
				<div className="user-content">
					<img className="user-img" src="/logo_03.jpg" alt="Placeholder for profile picture"></img>
					<p className="user-bio">{profile.bio}</p>
				</div>
			</div>
			<div className="user-fav-games">
				<h4 className="user-fav-games-header">Favorite games</h4>
				<ul className="user-fav-game-cards">
					{favGames.map((game) => (
						<li key={game.game.id} className="game-card">
							<img className="game-card-img" src={game.game.imageSmall} alt={game.game.name}></img>
							<p>{game.game.name}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default DisplayProfile;
