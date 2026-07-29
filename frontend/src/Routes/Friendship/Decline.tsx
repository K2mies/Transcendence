import toast from "react-hot-toast";
import type { FriendStatusRefresh } from "../../types";

function DeclineFriendRequest({
  username,
  refreshKey,
  setRefreshKey,
}: FriendStatusRefresh) {
  async function declineRequest() {
    const response: Response = await fetch(
      `http://localhost:4243/profile/${username}/decline-request`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );
    if (response.ok) {
      await response.json();
    } else {
      toast.custom(() => (
        <div className="rounded-lg bg-[#d32f2f] p-4 text-white">
          <div className="flex items-center gap-2">
            Error declining friend request. Please try again.
          </div>
        </div>
      ));
    }
    window.dispatchEvent(new Event("auth-changed"));
    setRefreshKey(refreshKey + 1);
  }

  return (
    <>
      <button className="ml-1.5" onClick={declineRequest}>
        Decline request
      </button>
    </>
  );
}

export default DeclineFriendRequest;
