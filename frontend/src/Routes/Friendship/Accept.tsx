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
      console.error("Error accepting friend request");
    }
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
