import { Link } from "react-router-dom";
import Stars from "./Stars";

type GameCardProps = {
  game: {
    id: number;
    name: string;
    imageBig: string;
    developer: string | null;
    rating: number;
  };
};

function GameCard({ game }: GameCardProps) {
  return (
    <div className="w-[174px] relative group">
      <Link to={"/game/" + game.name}>
        <img
          src={game.imageBig}
          alt={game.name}
          className="border-primary border-x-3 border-t-3 w-full rounded-t-lg"
        />
      </Link>

      <h2
        className="
          bg-primary
          text-tertiary
          relative
          -mt-14
          z-10
          w-full
          p-2
          h-[3.5rem]
          flex
          items-center
          justify-center
          text-center
          text-[90%]
          line-clamp-2

          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-300
        "
      >
        <Link to={"/game/" + game.name} className="no-underline">
          {game.name}
        </Link>
      </h2>

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
        <p>Rating: {game.rating}</p>
        <Stars rating={game.rating} />
      </div>
    </div>
  );
}

export default GameCard;
