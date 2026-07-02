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
    setRefreshKey(refreshKey + 1);
  }

  return (
    <>
      <button className="ml-1.5" onClick={remove}>
        {text}
      </button>
    </>
  );
}

export default RemoveFriend;
