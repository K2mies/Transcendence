import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import AddFriend from "./Add";
import AcceptFriendRequest from "./Accept";
import DeclineFriendRequest from "./Decline";
import RemoveFriend from "./Remove";

type FriendButtonProps = {
  user: string;
  myCurrUser: string | undefined;
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

      if (!response.ok) {
        toast.custom(() => (
          <div className="rounded-lg bg-[#d32f2f] p-4 text-white">
            <div className="flex items-center gap-2">
              Failed to get friendship status. Please try again.
            </div>
          </div>
        ));
      }

      const res: {
        friendStatus: string | undefined;
        sender?: string;
      } = await response.json();

      if (res.friendStatus === "PENDING" && res.sender === user) {
        setFriendStatus("RECEIVED");
      } else {
        setFriendStatus(res.friendStatus);
      }
    }

    getStatus();
  }, [user, myCurrUser, username, refreshKey]);

  useEffect(() => {
    function refreshStatus() {
      setRefreshKey((key) => key + 1);
    }

    window.addEventListener("friend-status-changed", refreshStatus);

    return () => {
      window.removeEventListener("friend-status-changed", refreshStatus);
    };
  }, []);

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
          text="Request pending"
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
