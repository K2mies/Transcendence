import { Link } from "react-router-dom";
import Stars from "../../Rating/Stars";
import FavoriteButton from "../../Rating/FavoriteButton";

type GameCardProps = {
  game: {
    id: number;
    name: string;
    imageBig: string;
    developer: string | null;
    rating: number;
    favorite: boolean;
  };
};

function GameCard({ game }: GameCardProps) {
  return (
    <div className="basis-1/5 relative group">
      <Link to={"/game/" + encodeURIComponent(game.name)}>
        <img
          src={game.imageBig}
          alt={game.name}
          className="border-primary border-x-3 border-t-3 w-full rounded-t-lg"
        />
      </Link>

      <div className="absolute top-2 right-2 z-20 text-2xl text-secondary">
        <FavoriteButton game={game} />
      </div>
      <h2
        className="
          absolute
          bottom-[3.4rem]
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
      
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-300
      
          rounded-t-lg
        "
      >
        <Link
          to={"/game/" + encodeURIComponent(game.name)}
          className="no-underline"
        >
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
