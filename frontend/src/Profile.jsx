import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';

function ProfileInfo(props) {
	return (
		<div className="user-info">
			<div className="user-header">
				<h2>{props.profile.name}</h2>
				<button>Add friend</button>
			</div>
			<div className="user-content">
				<img className="user-img" src="/logo_03.jpg" alt="Placeholder for profile picture"></img>
				<p className="user-bio">{props.profile.bio}</p>
			</div>
		</div>
	);
}

const SwiperButtonPrev = ({ children }) => {
	const swiper = useSwiper();
	return (
		<div className="swiper-button-prev" onClick={() => swiper.slidePrev()}>{children}</div>
	);
}

const SwiperButtonNext = ({ children }) => {
	const swiper = useSwiper();
	return (
		<div className="swiper-button-next" onClick={() => swiper.slideNext()}>{children}</div>
	);
}

function DisplayGames(props) {
	return (
		<>
		<h4 className="user-games-header">{props.header}</h4>
		{props.games.length > 5 ? (
			<div>
				<Swiper
					style={{ '--swiper-navigation-color': 'red' }}
					modules={Navigation}
					spaceBetween={30}
					slidesPerView={5}
					navigation={{
						prevEl: ".swiper-button-prev",
						nextEl: ".swiper-button-next",
					}}
					allowTouchMove={false}
					>
					{props.games.map((game, index) => (
						<SwiperSlide key={game.id}>
						<img className="game-card-img" src={game.image} alt={game.name}></img>
						<p>{game.name}</p>
					</SwiperSlide>
					))}
					<SwiperButtonPrev>←</SwiperButtonPrev>
					<SwiperButtonNext>→</SwiperButtonNext>
				</Swiper>
			</div>
		) : (
			<div className="user-games">
				<ul className="game-cards">
					{props.games.map((game) => (
						<li key={game.id} className="game-card">
							<img className="game-card-img" src={game.image} alt={game.name}></img>
							<p>{game.name}</p>
						</li>
					))}
				</ul>
			</div>
		)}
		</>
	)
}

function DisplayProfile() {
	const [profile, setProfile] = useState({});
	const [favGames, setFavGames] = useState([]);
	const [currGames, setCurrGames] = useState([]);
	const [isUserFound, setIsUserFound] = useState(undefined);
	const { username } = useParams();

	useEffect(() => {
		async function loadProfile() {
			const user = encodeURIComponent(username);
			const response = await fetch(`http://localhost:4243/profile/${user}`);
			if (response.status === 200) {
				const res = await response.json();
				setIsUserFound(true);
				setProfile(res);
				if (res.favorites)
					setFavGames(res.favorites);
				if (res.playing)
					setCurrGames(res.playing);
			} else {
				setIsUserFound(false);
			}
		}

		loadProfile();
	}, []);

	return (
		<div>
			{isUserFound &&
			<div>
				<ProfileInfo profile={profile}></ProfileInfo>
				{favGames &&
				<DisplayGames
					header="Favorite games"
					games={favGames}>
				</DisplayGames>}
				{currGames &&
				<DisplayGames
					header="Currently playing"
					games={currGames}>
				</DisplayGames>}
			</div>}
			{isUserFound === false &&
			<div>
				<p>404 User not found</p>
			</div>}

		</div>
	);
}

export default DisplayProfile;
