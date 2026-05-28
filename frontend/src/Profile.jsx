import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";
import Reviews from "./Reviews";

import "swiper/css";
import "swiper/css/navigation";

function ProfileInfo(props) {
  return (
    <div className="user-game-info">
      <div className="user-game-header">
        <h2>{props.profile.name}</h2>
        <button>Add friend</button>
      </div>
      <div className="user-game-content">
        <img
          className="user-img"
          src="/logo_03.jpg"
          alt="Placeholder for profile picture"
        ></img>
        <p className="user-game-bio">{props.profile.bio}</p>
      </div>
    </div>
  );
}

const SwiperButtonPrev = ({ children }) => {
  const swiper = useSwiper();
  return (
    <div className="swiper-button-prev" onClick={() => swiper.slidePrev()}>
      {children}
    </div>
  );
};

const SwiperButtonNext = ({ children }) => {
  const swiper = useSwiper();
  return (
    <div className="swiper-button-next" onClick={() => swiper.slideNext()}>
      {children}
    </div>
  );
};

function DisplayGames(props) {
  return (
    <>
      <h4 className="user-game-header">{props.header}</h4>
      {props.games.length > 5 ? (
        <div>
          <Swiper
            style={{ "--swiper-navigation-color": "red" }}
            modules={Navigation}
            spaceBetween={30}
            slidesPerView={5}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            allowTouchMove={false}
          >
            {props.games.map((game) => (
              <SwiperSlide key={game.id}>
                <img
                  className="game-card-img"
                  src={game.image}
                  alt={game.name}
                ></img>
                <p>{game.name}</p>
              </SwiperSlide>
            ))}
            <SwiperButtonPrev>&lt;</SwiperButtonPrev>
            <SwiperButtonNext>&gt;</SwiperButtonNext>
          </Swiper>
        </div>
      ) : (
        <div className="user-games">
          <ul className="game-cards">
            {props.games.map((game) => (
              <li key={game.id} className="game-card">
                <img
                  className="game-card-img"
                  src={game.image}
                  alt={game.name}
                ></img>
                <p>{game.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

function DisplayProfile() {
  const [profile, setProfile] = useState({});
  const [favGames, setFavGames] = useState([]);
  const [currGames, setCurrGames] = useState([]);
  const [toPlayGames, setToPlayGames] = useState([]);
  const [completedGames, setCompletedGames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isUserFound, setIsUserFound] = useState(undefined);
  const { username } = useParams();

  useEffect(() => {
    async function loadProfile() {
      const response = await fetch(`http://localhost:4243/profile/${username}`);
      if (response.status === 200) {
        const res = await response.json();
        setIsUserFound(true);
        setProfile(res);
        if (res.favorites.length > 0) setFavGames(res.favorites);
        if (res.playing.length > 0) setCurrGames(res.playing);
        if (res.to_play.length > 0) setToPlayGames(res.to_play);
        if (res.completed.length > 0) setCompletedGames(res.completed);
		if (res.reviews.length > 0) setReviews(res.reviews);
      } else {
        setIsUserFound(false);
      }
    }

    loadProfile();
  }, []);

  return (
    <div>
      {isUserFound && (
        <div>
          <ProfileInfo profile={profile}></ProfileInfo>
          {favGames.length > 0 && (
            <DisplayGames
              header="Favorite games"
              games={favGames}
            ></DisplayGames>
          )}
          {currGames.length > 0 && (
            <DisplayGames
              header="Currently playing"
              games={currGames}
            ></DisplayGames>
          )}
          {toPlayGames.length > 0 && (
            <DisplayGames
              header="Games to play"
              games={toPlayGames}
            ></DisplayGames>
          )}
          {completedGames.length > 0 && (
            <DisplayGames
              header="Completed games"
              games={completedGames}
            ></DisplayGames>
          )}
		  {reviews.length > 0 && (
	          <Reviews reviews={reviews}></Reviews>
		  )}
        </div>
      )}
      {isUserFound === false && (
        <div>
          <p>404 User not found</p>
        </div>
      )}
    </div>
  );
}

export default DisplayProfile;
