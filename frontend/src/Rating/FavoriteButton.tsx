import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

async function updateGameRelation(
  gamename: string,
  newData: { favorite: boolean },
) {
  const name = encodeURIComponent(gamename);

  const response = await fetch(
    `http://localhost:4243/game/${name}/update-game-relation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newData),
    },
  );

  if (response.status !== 200) {
    console.error("Error updating game relation");
  }
}

function FavoriteButton({ game }: { game: { name: string; favorite?: boolean } }) {
  const [favoriteState, setFavoriteState] = useState(Boolean(game.favorite));

  function changeValue(e) {
    e.preventDefault();
    e.stopPropagation();

    const newValue = !favoriteState;

    setFavoriteState(newValue);

    updateGameRelation(game.name, {
      favorite: newValue,
    });
  }

  return (
    <button
      type="button"
      aria-label={favoriteState ? "Remove from favorites" : "Add to favorites"}
      onClick={changeValue}
    >
      {favoriteState ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}

export default FavoriteButton;
