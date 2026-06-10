import { useEffect, useState } from "react";

type Game = {
  id: number;
  name: string;
  imageSmall: string;
  developer: string | null;
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

      {games.map((game) => (
        <div key={game.id}>
          <img src={game.imageBig} alt={game.name} />
          <h2>{game.name}</h2>
          <p>{game.developer}</p>
        </div>
      ))}

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
