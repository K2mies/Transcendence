import type { FriendStatusRefresh } from "../../types";

function AddFriend({
  username,
  refreshKey,
  setRefreshKey,
}: FriendStatusRefresh) {
  async function sendFriendRequest() {
    const response: Response = await fetch(
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
    setRefreshKey(refreshKey + 1);
  }

  return (
    <>
      <button className="ml-1.5" onClick={sendFriendRequest}>
        Add friend
      </button>
    </>
  );
}

export default AddFriend;
