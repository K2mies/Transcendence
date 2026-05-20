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
		<button onClick={() => swiper.slidePrev()}>{children}</button>
	);
}

const SwiperButtonNext = ({ children }) => {
	const swiper = useSwiper();
	return (
		<button onClick={() => swiper.slideNext()}>{children}</button>
	);
}

function FavoriteGames(props) {
	return (
		<>
		<h4 className="user-games-header">Favorite games</h4>
		{props.favGames.length > 5 ? (
			<div>
				<Swiper
					modules={Navigation}
					spaceBetween={30}
					slidesPerView={5}
					navigation={{
						prevEl: '.custom-prev',
						nextEl: '.custom-next',
					}}
					allowTouchMove={false}
					>
					<SwiperButtonPrev>←</SwiperButtonPrev>
					{props.favGames.map((game, index) => (
					<SwiperSlide key={game.game.id}>
						<img className="game-card-img" src={game.game.imageSmall} alt={game.game.name}></img>
						<p>{game.game.name}</p>
					</SwiperSlide>
					))}
					<SwiperButtonNext>→</SwiperButtonNext>
				</Swiper>
			</div>
		) : (
			<div className="user-games">
				<div className="game-cards-scroll-cont">
					<ul className="game-cards">
						{props.favGames.map((game) => (
							<li key={game.game.id} className="game-card">
								<img className="game-card-img" src={game.game.imageSmall} alt={game.game.name}></img>
								<p>{game.game.name}</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		)}
		</>
	)
}

function CurrentGames(props) {
	return (
		<>
		<h4 className="user-games-header">Currently playing</h4>
		{props.currGames.length > 5 ? (
			<div>
				<Swiper
					modules={Navigation}
					spaceBetween={30}
					slidesPerView={5}
					navigation={{
						prevEl: '.custom-prev',
						nextEl: '.custom-next',
					}}
					allowTouchMove={false}
					>
					<SwiperButtonPrev>←</SwiperButtonPrev>
					{props.currGames.map((game, index) => (
					<SwiperSlide key={game.game.id}>
						<img className="game-card-img" src={game.game.imageSmall} alt={game.game.name}></img>
						<p>{game.game.name}</p>
					</SwiperSlide>
					))}
					<SwiperButtonNext>→</SwiperButtonNext>
				</Swiper>
			</div>
		) : (
			<div className="user-games">
				<div className="game-cards-scroll-cont">
					<ul className="game-cards">
						{props.currGames.map((game) => (
							<li key={game.game.id} className="game-card">
								<img className="game-card-img" src={game.game.imageSmall} alt={game.game.name}></img>
								<p>{game.game.name}</p>
							</li>
						))}
					</ul>
				</div>
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
			const response = await fetch(`http://localhost:4243/profile?name=${username}`);
			if (response.status === 200) {
				const res = await response.json();
				setIsUserFound(true);
				setProfile(res);
				let favorites = (res.userGames).filter((game) => game.favorite === true);
				setFavGames(favorites);
				let playing = (res.userGames).filter((game) => game.status === "PLAYING");
				setCurrGames(playing);
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
				{favGames && <FavoriteGames favGames={favGames}></FavoriteGames>}
				{currGames && <CurrentGames currGames={currGames}></CurrentGames>}
			</div>}
			{isUserFound === false &&
			<div>
				<p>404 User not found</p>
			</div>}

		</div>
	);
}

export default DisplayProfile;
