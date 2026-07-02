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
            friends={profile.friends}
            sentReqs={profile.sent_reqs}
            recvReqs={profile.received_reqs}
            myCurrUser={myCurrUser}
            setMyCurrUser={setMyCurrUser}
          ></ProfileInfo>
          {profile.favorites.length > 0 && (
            <DisplayGames
              header="Favorite games"
              games={profile.favorites}
            ></DisplayGames>
          )}
          {profile.playing.length > 0 && (
            <DisplayGames
              header="Currently playing"
              games={profile.playing}
            ></DisplayGames>
          )}
          {profile.to_play.length > 0 && (
            <DisplayGames
              header="Games to play"
              games={profile.to_play}
            ></DisplayGames>
          )}
          {profile.completed.length > 0 && (
            <DisplayGames
              header="Completed games"
              games={profile.completed}
            ></DisplayGames>
          )}
          {profile.reviews.length > 0 && (
            <Reviews
              reviews={profile.reviews}
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
