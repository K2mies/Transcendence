import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Stars from "../../Rating/Stars";
import FavoriteButton from "../../Rating/FavoriteButton";

type Game = {
  id: number;
  name: string;
  image: string;
  rating?: number;
};

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
      <Link to={`/game/${encodeURIComponent(game.name)}`}>
        <img
          className="border-3 border-primary w-full h-auto rounded-t-lg object-cover"
          src={game.image}
          alt={game.name}
        />
      </Link>
      <div className="absolute top-2 right-2 z-20 text-2xl text-secondary">
        <FavoriteButton game={game} />
      </div>
      <h2
        className="
            bg-primary 
            text-tertiary
            
            border-2
            border-primary

            relative
            -mt-14
            z-10
            w-full
            p-2
            h-[3.5rem]

            flex
            items-center
            justify-center
            line-clamp-2

            opacity-0
            group-hover:opacity-100
            transition-opacity
            
            rounded-t-lg 
            text-center 
            text-xs
        "
      >
        <Link
          to={`/game/${encodeURIComponent(game.name)}`}
          className="no-underline"
        >
          {game.name}
        </Link>
      </h2>
      <div className="bg-primary rounded-b-lg flex justify-center p-1.5 h-7">
        {game.rating !== undefined && <Stars rating={game.rating} size={15} />}
      </div>
    </div>
  );
}

export default DashboardGameCard;
