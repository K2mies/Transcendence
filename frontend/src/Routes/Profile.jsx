import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";
import Reviews from "../Reviews";

import "swiper/css";
import "swiper/css/navigation";

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
      <h4 className=" bg-primary text-tertiary flex justify-start rounded-t-lg py-2 px-4">
        {props.header}
      </h4>
      <div className="bg-tertiary text-primary border-primary border-3 rounded-b-lg p-3">
        {props.games.length > 5 ? (
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
                        <Link
                          to={"/game/" + game.name}
                          className="no-underline"
                        >
                          {game.name}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col ml-[3em]">
            <ul className="flex flex-row gap-[2em]">
              {props.games.map((game) => (
                <li key={game.id} className="list-none w-25">
                  <div>
                    <img
                      className="border-3 border-secondary w-full h-30 rounded-t-lg"
                      src={game.image}
                      alt={game.name}
                    ></img>
                    <div className="bg-secondary text-primary p-2 rounded-b-lg text-center text-xs">
                      <Link to={"/game/" + game.name} className="no-underline">
                        {game.name}
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
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
