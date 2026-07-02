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
      console.error("Error declining friend request");
    }
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
