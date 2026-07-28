import { ImCross } from "react-icons/im";

type RemoveFriendProps = {
  text: string;
  username: string;
  refreshKey: number;
  setRefreshKey: (refreshKey: number) => void;
};

function RemoveFriend({
  text,
  username,
  refreshKey,
  setRefreshKey,
}: RemoveFriendProps) {
  async function remove() {
    const response: Response = await fetch(
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
    window.dispatchEvent(new Event("auth-changed"));
    setRefreshKey(refreshKey + 1);
  }

  return (
    <>
      <button className="inline-flex items-center gap-4" onClick={remove}>
        {text} <ImCross size={14} className="text-tertiary" aria-hidden="true" focusable="false" />
      </button>
    </>
  );
}

export default RemoveFriend;
