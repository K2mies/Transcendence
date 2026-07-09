import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useFavorites } from "./FavoritesContext";
import type { Game } from "../Types/GameType";

type FavoriteButtonProps = {
  game: Game;
  size?: number;
};

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
    throw new Error("Error updating game relation");
  }
}

function FavoriteButton({ game, size = 16 }: FavoriteButtonProps) {
  const { isFavorite, setFavorite } = useFavorites();

  const favoriteState = isFavorite(game.id);

  async function changeValue(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    const newValue = !favoriteState;

    setFavorite(game.id, newValue);

    try {
      await updateGameRelation(game.name, {
        favorite: newValue,
      });
    } catch (error) {
      console.error(error);

      setFavorite(game.id, favoriteState);
    }
  }

  return (
    <button
      type="button"
      aria-label={favoriteState ? "Remove from favorites" : "Add to favorites"}
      onClick={changeValue}
    >
      {favoriteState ? <FaHeart size={size} /> : <FaRegHeart size={size} />}
    </button>
  );
}

export default FavoriteButton;
