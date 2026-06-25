import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import Reviews from "../../Reviews";

function DisplayGames(props) {
  return (
    <div className="mt-6">
      <h4 className=" bg-primary text-tertiary flex justify-start rounded-t-lg py-2 px-4">
        {props.header}
      </h4>
      <div className="bg-tertiary text-primary border-primary border-3 rounded-b-lg p-3">
        <div className="mt-6">
          <div className="bg-tertiary text-primary rounded-b-lg p-3">
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2">
                {props.games.map((game) => (
                  <div key={game.id} className="shrink-0 w-25 snap-start">
                    <img
                      className="border-3 border-secondary w-full h-auto rounded-t-lg object-cover"
                      src={game.image}
                      alt={game.name}
                    />
                    <div className="bg-secondary text-primary p-2 rounded-b-lg text-center text-xs">
                      <Link to={"/game/" + game.name} className="no-underline">
                        {game.name}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Profile({ myCurrUser, setMyCurrUser }) {
  const [profile, setProfile] = useState({});
  const [friends, setFriends] = useState([]);
  const [favGames, setFavGames] = useState([]);
  const [currGames, setCurrGames] = useState([]);
  const [toPlayGames, setToPlayGames] = useState([]);
  const [completedGames, setCompletedGames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isUserFound, setIsUserFound] = useState(undefined);
  const { username } = useParams();

  useEffect(() => {
    if (!username) return;
    async function loadProfile() {
      const response = await fetch(
        `http://localhost:4243/profile/${username}`,
        {
          credentials: "include",
        },
      );
      if (response.status === 200) {
        const res = await response.json();
        setIsUserFound(true);
        setProfile(res);
        setFriends(res.friends);
        setFavGames(res.favorites);
        setCurrGames(res.playing);
        setToPlayGames(res.to_play);
        setCompletedGames(res.completed);
        setReviews(res.reviews);
      } else {
        setIsUserFound(false);
      }
    }

    loadProfile();
  }, [username]);

  return (
    <div className="bg-secondary p-6 min-h-screen">
      {isUserFound && (
        <div>
          <ProfileInfo
            profile={profile}
            friends={friends}
            myCurrUser={myCurrUser}
            setMyCurrUser={setMyCurrUser}
          ></ProfileInfo>
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
            <Reviews
              reviews={reviews}
              myCurrUser={myCurrUser}
              page="profile"
            ></Reviews>
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

export default Profile;
