import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Stars from "./Stars";

type Game = {
  id: number;
  name: string;
  imageSmall: string;
  imageBig: string;
  developer: string | null;
  rating: number;
};

type Pagination = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
};

function Games() {
  const [games, setGames] = useState<Game[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchGames() {
      const response = await fetch(
        `http://localhost:4243/search?page=${page}`,
        {
          credentials: "include",
        },
      );

      const result = await response.json();

      if (result.status === "success") {
        setGames(result.data);
        setPagination(result.pagination);
      }
    }
    fetchGames();
  }, [page]);
  return (
    <div className="bg-secondary text-primary min-h-screen p-6">
      <h1>Games</h1>

      <div className="relative grid grid-cols-5 gap-6 px-2">
        {games.map((game) => (
          <div key={game.id} className="w-[185px] group">
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
                -mt-15
                z-10
                w-full

                break-words
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
                
                rounded-t-lg
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
                relative group
                "
            >
              <p> Rating: {game.rating}</p>
              <Stars rating={game.rating} />
            </div>
          </div>
        ))}
      </div>

      <div>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span>
          Page {pagination?.page} of {pagination?.totalPages}
        </span>

        <button
          disabled={page === pagination?.totalPages}
          onClick={() => {
            console.log("Next clicked");
            setPage((prev) => prev + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default Games;
