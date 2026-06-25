import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";

type Game = {
  id: number;
  name: string;
  image: string;
};

type SmallGameCardProps = {
  game: Game;
  onRemove?: (game: Game) => void;
};

function SmallGameCard({ game, onRemove }: SmallGameCardProps) {
  return (
    <div className="shrink-0 w-25 snap-start relative group">
      <Link to={`/game/${game.name}`}>
        <img
          className="border-3 border-primary w-full h-auto rounded-t-lg object-cover"
          src={game.image}
          alt={game.name}
        />
      </Link>

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
        <Link to={`/game/${game.name}`} className="no-underline">
          {game.name}
        </Link>
      </h2>
      {onRemove && (
        <div className="bg-primary rounded-b-lg flex justify-end p-1.5">
          <button type="button" onClick={() => onRemove(game)} className="">
            <ImCross size={10} className="text-tertiary" />
          </button>
        </div>
      )}
    </div>
  );
}

export default SmallGameCard;
