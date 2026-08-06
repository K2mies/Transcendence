import toast from "react-hot-toast";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useFavorites } from "./useFavorites";
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
    `/api/game/${name}/update-game-relation`,
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
    throw new Error("Failed to update favorite status. Please try again");
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
      toast.custom(() => (
        <div className="rounded-lg bg-[#d32f2f] p-4 text-white">
          <div className="flex items-center gap-2">
            {error instanceof Error && error.message
              ? error.message
              : "Failed to update favorite status. Please try again."}
          </div>
        </div>
      ));

      setFavorite(game.id, favoriteState);
    }
  }

  return (
    <button
      type="button"
      aria-label={favoriteState ? "Remove from favorites" : "Add to favorites"}
      onClick={changeValue}
    >
      {favoriteState ? (
        <FaHeart size={size} aria-hidden="true" focusable="false" />
      ) : (
        <FaRegHeart size={size} aria-hidden="true" focusable="false" />
      )}
    </button>
  );
}

export default FavoriteButton;
