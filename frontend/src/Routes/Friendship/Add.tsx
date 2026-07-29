import toast from "react-hot-toast";
import type { FriendStatusRefresh } from "../../types";
import { MdPersonAdd } from "react-icons/md";

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
      toast.custom(() => (
        <div className="rounded-lg bg-[#d32f2f] p-4 text-white">
          <div className="flex items-center gap-2">
            Error sending friend request. Please try again.
          </div>
        </div>
      ));
    }
    window.dispatchEvent(new Event("auth-changed"));
    setRefreshKey(refreshKey + 1);
  }

  return (
    <>
      <button
        className="inline-flex items-center gap-2"
        onClick={sendFriendRequest}
      >
        Add friend{" "}
        <MdPersonAdd
          size={16}
          className="text-tertiary"
          aria-hidden="true"
          focusable="false"
        />
      </button>
    </>
  );
}

export default AddFriend;
