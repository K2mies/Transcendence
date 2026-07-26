import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FavoriteButton from "../../Rating/FavoriteButton";
import type { Game } from "../../Types/GameType";

type DashboardGameCardProps = {
  game: Game;
  onRemove?: (game: Game) => void;
  index: number;
};

function DashboardGameCard({ game, index }: DashboardGameCardProps) {
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
        shrink-0
        w-25
        snap-start
        relative
        group
        transition-all
        duration-1000
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      `}
    >
      <Link
        to={`/game/${encodeURIComponent(game.name)}`}
        aria-label={game.name}
      >
        <img
          className="border-3 border-primary w-full h-auto rounded-t-lg object-cover"
          src={game.image}
          alt=""
        />
      <h3
        className="
            absolute
            left-0
            right-0
            bottom-8

            bg-primary
            text-xs
            text-tertiary

            border-2
            border-primary

            p-2

            flex
            items-center
            justify-center

            invisible
            group-hover:visible
            group-focus-within:visible

            rounded-t-lg
            z-10
        "
      >
          {game.name}
        </h3>
      </Link>
      <div className="bg-primary text-secondary rounded-b-lg flex justify-end p-2">
        <FavoriteButton game={game} size={14} />
      </div>
    </div>
  );
}

export default DashboardGameCard;
