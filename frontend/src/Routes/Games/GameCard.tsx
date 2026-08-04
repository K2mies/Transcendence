import { Link } from "react-router-dom";
import Stars from "../../Rating/Stars";
import FavoriteButton from "../../Rating/FavoriteButton";
import { useEffect, useState } from "react";
import type { Game } from "../../Types/GameType";

type GameCardProps = {
  game: Game;
  index: number;
};

function GameCard({ game, index }: GameCardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, index * 50);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`
         basis-1/5
         relative
         group
         transition-opacity
         duration-700
         ${visible ? "opacity-100" : "opacity-0"}
       `}
    >
      <Link to={"/game/" + encodeURIComponent(game.name)}>
        <img
          src={game.imageBig}
          alt=""
          className="border-primary border-x-3 border-t-3 w-full rounded-t-lg"
        />

        <h2
          className="
            absolute
            bottom-[3.78rem]
            left-0
            z-10
            w-full

            bg-primary
            text-tertiary

            px-4
            py-2

            text-center
            text-[90%]
            leading-relaxed

            invisible
            group-hover:visible
            group-focus-within:visible

            rounded-t-lg
          "
        >
          {game.name}
        </h2>
      </Link>

      <div className="absolute top-2 right-2 z-20 text-2xl text-secondary">
        <FavoriteButton game={game} size={25} />
      </div>
      <div
        className="
          bg-tertiary
          text-primary
          border-primary
          border-x-3
          border-b-3
          text-center
          rounded-b-lg
        "
      >
        <p>Rating: {(game.combinedRating ?? game.igdbRating).toFixed(1)}</p>
        <Stars
          hidden={true}
          rating={game.combinedRating ?? game.igdbRating}
          size={26}
        />
      </div>
    </div>
  );
}

export default GameCard;
