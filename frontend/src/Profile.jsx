import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProfileInfo(props) {
  return (
    <div className="user-info">
      <div className="user-header">
        <h2>{props.profile.name}</h2>
        <button>Add friend</button>
      </div>
      <div className="user-content">
        <img
          className="user-img"
          src="/logo_03.jpg"
          alt="Placeholder for profile picture"
        ></img>
        <p className="user-bio">{props.profile.bio}</p>
      </div>
    </div>
  );
}

function FavoriteGames(props) {
  return (
    <div className="user-games">
      <h4 className="user-games-header">Favorite games</h4>
      <div className="game-cards-scroll-cont">
        <ul className="game-cards">
          {props.favGames.map((game) => (
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
    </div>
  );
}

function CurrentGames(props) {
  return (
    <div className="user-games">
      <h4 className="user-games-header">Currently playing</h4>
      <div className="game-cards-scroll-cont">
        <ul className="game-cards">
          {props.currGames.map((game) => (
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
    </div>
  );
}

function DisplayProfile() {
  const [profile, setProfile] = useState({});
  const [favGames, setFavGames] = useState([]);
  const [currGames, setCurrGames] = useState([]);
  const [isUserFound, setIsUserFound] = useState(undefined);
  const { username } = useParams();

  useEffect(() => {
    async function loadProfile() {
      const response = await fetch(`http://localhost:4243/profile/${username}`);
      if (response.status === 200) {
        const res = await response.json();
        setIsUserFound(true);
        setProfile(res);
        let favorites = res.favorites;
        setFavGames(favorites);
        let playing = res.playing;
        setCurrGames(playing);
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
          {favGames && <FavoriteGames favGames={favGames}></FavoriteGames>}
          {currGames && <CurrentGames currGames={currGames}></CurrentGames>}
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
