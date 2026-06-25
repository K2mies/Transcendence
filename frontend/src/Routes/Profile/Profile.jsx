import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "../../Reviews";
import SmallGameCard from "./SmallGameCard";

function FriendButton({ user }) {
  const [friendStatus, setFriendStatus] = useState(undefined);
  const [refreshKey, setRefreshKey] = useState(0);
  const username = encodeURIComponent(user);

  useEffect(() => {
    if (!user) return;
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

function ProfileInfo(props) {
  const myUser = JSON.parse(localStorage.getItem("user"));
  const isMyUser = myUser.name === props.profile.name;
  return (
    <div className="bg-primary text-tertiary flex flex-col rounded-t-lg">
      <div className="flex">
        <h2 className="p-4">{props.profile.name}</h2>
        <div className="bg-primary text-tertiary ml-auto m-6">
          {!isMyUser && <FriendButton user={props.profile.name}></FriendButton>}
          {isMyUser && <button>Edit profile info</button>}
        </div>
      </div>
      <div className="bg-tertiary text-primary border-primary border-3 flex flex-row items-start gap-8 rounded-b-lg">
        <img
          className="border-secondary border-4 w-40 h-auto rounded-lg m-4"
          src="/logo_03.jpg"
          alt="Placeholder for profile picture"
        ></img>
        <p className=" mt-4 w-[50%] text-left">{props.profile.bio}</p>
      </div>
    </div>
  );
}

function DisplayGames(props) {
  return (
    <div className="mt-6">
      <h4 className=" bg-primary text-tertiary flex justify-start rounded-t-lg p-5">
        {props.header}
      </h4>
      <div className="bg-tertiary text-primary border-primary border-3 rounded-b-lg">
        <div className="">
          <div className="bg-tertiary text-primary relative rounded-b-lg p-5">
            <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-5">
              {props.games.map((game) => (
                <SmallGameCard
                  key={game.id}
                  game={game}
                  onRemove={props.onRemove}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Profile() {
  const [profile, setProfile] = useState({});
  const [favGames, setFavGames] = useState([]);
  const [currGames, setCurrGames] = useState([]);
  const [toPlayGames, setToPlayGames] = useState([]);
  const [completedGames, setCompletedGames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isUserFound, setIsUserFound] = useState(undefined);
  const { username } = useParams();

  async function removeFavorite(game) {
    const response = await fetch(
      `http://localhost:4243/game/${encodeURIComponent(game.name)}/update-game-relation`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favorite: false,
        }),
      },
    );

    if (response.ok) {
      setFavGames((games) => games.filter((g) => g.id !== game.id));
    }
  }

  async function removeGameState(game, setGames) {
    const response = await fetch(
      `http://localhost:4243/game/${encodeURIComponent(game.name)}/update-game-relation`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameStatus: "NONE",
        }),
      },
    );

    if (response.ok) {
      setGames((games) => games.filter((g) => g.id !== game.id));
    }
  }

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
          <ProfileInfo profile={profile}></ProfileInfo>
          {favGames.length > 0 && (
            <DisplayGames
              header="Favorite games"
              games={favGames}
              onRemove={removeFavorite}
            ></DisplayGames>
          )}
          {currGames.length > 0 && (
            <DisplayGames
              header="Currently playing"
              games={currGames}
              onRemove={(game) => removeGameState(game, setCurrGames)}
            ></DisplayGames>
          )}
          {toPlayGames.length > 0 && (
            <DisplayGames
              header="Games to play"
              games={toPlayGames}
              onRemove={(game) => removeGameState(game, setToPlayGames)}
            ></DisplayGames>
          )}
          {completedGames.length > 0 && (
            <DisplayGames
              header="Completed games"
              games={completedGames}
              onRemove={(game) => removeGameState(game, setCompletedGames)}
            ></DisplayGames>
          )}
          {reviews.length > 0 && (
            <Reviews reviews={reviews} page="profile"></Reviews>
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
