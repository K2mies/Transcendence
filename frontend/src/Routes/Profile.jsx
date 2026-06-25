import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Reviews from "../Reviews";
import { EditName, EditBio } from "./EditProfile";

function FriendButton({ user, myCurrUser }) {
  const [friendStatus, setFriendStatus] = useState(undefined);
  const [refreshKey, setRefreshKey] = useState(0);
  const username = encodeURIComponent(user);

  useEffect(() => {
    if (!user || user === myCurrUser) return;
    async function getStatus() {
      const response = await fetch(
        `http://localhost:4243/profile/${username}/friend-status`,
        {
          credentials: "include",
        },
      );
      const res = await response.json();
      if (res.friendStatus === "PENDING" && res.sender === user)
        setFriendStatus("RECEIVED");
      else setFriendStatus(res.friendStatus);
    }

    getStatus();
  }, [user, refreshKey]);

  const updateRefreshKey = () => {
    setRefreshKey((value) => value + 1);
  };

  const handleClick = async () => {
    if (friendStatus === undefined) {
      const response = await fetch(
        `http://localhost:4243/profile/${username}/friend-request`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      if (response.status === 200) {
        await response.json();
      } else {
        console.error("Error sending friend request");
      }
    } else if (friendStatus === "RECEIVED") {
      const response = await fetch(
        `http://localhost:4243/profile/${username}/accept-request`,
        {
          method: "PUT",
          credentials: "include",
        },
      );
      if (response.ok) {
        await response.json();
      } else {
        console.error("Error accepting friend request");
      }
    } else if (friendStatus === "FRIENDS" || friendStatus === "PENDING") {
      const response = await fetch(
        `http://localhost:4243/profile/${username}/remove-friend`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      if (response.ok) {
        await response.json();
      } else {
        console.error("Error removing friend");
      }
    }
    updateRefreshKey();
  };

  let buttonText;
  switch (friendStatus) {
    case undefined:
      buttonText = "Add friend";
      break;
    case "RECEIVED":
      buttonText = "Accept request";
      break;
    case "PENDING":
      buttonText = "Request pending - delete";
      break;
    default:
      buttonText = "Remove friend";
  }
  return (
    <>
      <button onClick={handleClick}>{buttonText}</button>
      {friendStatus === "RECEIVED" && (
        <button
          className="ml-1.5"
          onClick={async () => {
            const response = await fetch(
              `http://localhost:4243/profile/${username}/decline-request`,
              {
                method: "DELETE",
                credentials: "include",
              },
            );
            if (response.ok) {
              await response.json();
            } else {
              console.error("Error declining friend request");
            }
            updateRefreshKey();
          }}
        >
          Decline request
        </button>
      )}
    </>
  );
}

function ProfileInfo({ profile, myCurrUser, setMyCurrUser }) {
  const [editNameMode, setEditNameMode] = useState(false);
  const [editBioMode, setEditBioMode] = useState(false);
  const [currBio, setCurrBio] = useState(profile.bio);
  const isMyUser = myCurrUser === profile.name;
  return (
    <div className="bg-primary text-tertiary flex flex-col rounded-t-lg">
      <div className="flex h-[4.3em]">
        {editNameMode && (
          <EditName
            setEditNameMode={setEditNameMode}
            myCurrUser={myCurrUser}
            setMyCurrUser={setMyCurrUser}
          />
        )}
        {!editNameMode && <h2 className="p-4">{profile.name}</h2>}
        {isMyUser && !editNameMode && (
          <button onClick={() => setEditNameMode(true)}>Change username</button>
        )}
        <div className="bg-primary text-tertiary ml-auto m-6">
          {!isMyUser && (
            <FriendButton
              user={profile.name}
              myCurrUser={myCurrUser}
            ></FriendButton>
          )}
        </div>
      </div>
      <div className="bg-tertiary text-primary border-primary border-3 flex flex-row items-start gap-8 rounded-b-lg">
        <img
          className="border-secondary border-4 w-40 h-auto rounded-lg m-4"
          src="/logo_03.jpg"
          alt="Placeholder for profile picture"
        ></img>
        {editBioMode && (
          <EditBio
            setEditBioMode={setEditBioMode}
            currBio={currBio}
            setCurrBio={setCurrBio}
          />
        )}
        {!editBioMode && (
          <p className=" my-4 mr-4 max-w-[50%] text-left">{currBio}</p>
        )}
        {isMyUser && !editBioMode && (
          <button className="mt-4" onClick={() => setEditBioMode(true)}>
            Edit biography
          </button>
        )}
      </div>
    </div>
  );
}

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
