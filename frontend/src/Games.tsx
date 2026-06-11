import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import PaginationControls from "./PaginationControls";

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
      <h1 className="bg-primary text-tertiary text-center mb-5 w-full rounded-t-lg">
        Games
      </h1>

      <div className="relative grid grid-cols-5 gap-6 px-2 mt-7">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      <PaginationControls
        page={page}
        totalPages={pagination?.totalPages ?? 1}
        onPrevious={() => setPage((prev) => prev - 1)}
        onNext={() => setPage((prev) => prev + 1)}
      />
    </div>
  );
}
export default Games;
