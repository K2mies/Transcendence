import toast from "react-hot-toast";
import type { FriendStatusRefresh } from "../../types";

function AcceptFriendRequest({
  username,
  refreshKey,
  setRefreshKey,
}: FriendStatusRefresh) {
  async function acceptRequest() {
    const response: Response = await fetch(
      `http://localhost:4243/profile/${username}/accept-request`,
      {
        method: "PUT",
        credentials: "include",
      },
    );
    if (response.status === 200) {
      await response.json();
    } else {
      toast.custom(() => (
        <div className="rounded-lg bg-[#d32f2f] p-4 text-white">
          <div className="flex items-center gap-2">
            Error accepting friend request. Please try again.
          </div>
        </div>
      ));
    }
    window.dispatchEvent(new Event("auth-changed"));
    setRefreshKey(refreshKey + 1);
  }

  return (
    <>
      <button className="ml-1.5" onClick={acceptRequest}>
        Accept request
      </button>
    </>
  );
}

export default AcceptFriendRequest;
