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

      <div className="grid grid-cols-4 gap-6">
        {games.map((game) => (
          <div key={game.id} className="w-[234px]">
            <Link to={"/game/" + game.name}>
              <img
                src={game.imageBig}
                alt={game.name}
                className="border-primary border-3 w-full rounded-t-lg"
              />
            </Link>

            <div className=" bg-tertiary text-primary border-primary border-3 text-center rounded-b-lg">
              <h2 className=" bg-primary text-tertiary break-words p-2 text-[90%]">
                <Link to={"/game/" + game.name} className="no-underline">
                  {game.name}
                </Link>
              </h2>
              <p className="p-2">{game.developer}</p>
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
