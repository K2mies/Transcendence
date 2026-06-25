import { useState, useEffect } from "react";

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

export default FriendButton;
