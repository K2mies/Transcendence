import { useState, useEffect } from "react";
import AddFriend from "./Add";
import AcceptFriendRequest from "./Accept";
import DeclineFriendRequest from "./Decline";
import RemoveFriend from "./Remove";

type FriendButtonProps = {
  user: string;
  myCurrUser: string;
};

function FriendButton({ user, myCurrUser }: FriendButtonProps) {
  const [friendStatus, setFriendStatus] = useState<string | undefined>(
    undefined,
  );
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const username: string = encodeURIComponent(user);

  useEffect(() => {
    if (!user || user === myCurrUser) return;
    async function getStatus() {
      const response: Response = await fetch(
        `http://localhost:4243/profile/${username}/friend-status`,
        {
          credentials: "include",
        },
      );
      const res: { friendStatus: string; sender: string } =
        await response.json();
      if (res.friendStatus === "PENDING" && res.sender === user)
        setFriendStatus("RECEIVED");
      else setFriendStatus(res.friendStatus);
    }

    getStatus();
  }, [user, refreshKey]);

  return (
    <>
      {friendStatus === undefined && (
        <AddFriend
          username={username}
          refreshKey={refreshKey}
          setRefreshKey={setRefreshKey}
        />
      )}
      {friendStatus === "RECEIVED" && (
        <>
          <AcceptFriendRequest
            username={username}
            refreshKey={refreshKey}
            setRefreshKey={setRefreshKey}
          />
          <DeclineFriendRequest
            username={username}
            refreshKey={refreshKey}
            setRefreshKey={setRefreshKey}
          />
        </>
      )}
      {friendStatus === "PENDING" && (
        <RemoveFriend
          text="Request pending - delete"
          username={username}
          refreshKey={refreshKey}
          setRefreshKey={setRefreshKey}
        />
      )}
      {friendStatus === "FRIENDS" && (
        <RemoveFriend
          text="Remove friend"
          username={username}
          refreshKey={refreshKey}
          setRefreshKey={setRefreshKey}
        />
      )}
    </>
  );
}

export default FriendButton;
