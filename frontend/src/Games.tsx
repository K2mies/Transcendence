import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import PaginationControls from "./PaginationControls";
import GameFilter from "./GameFilter";

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
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("name-asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);

  useEffect(() => {
    async function fetchGames() {
      const params = new URLSearchParams();

      params.set("page", String(page));

      if (searchTerm) {
        params.set("search", searchTerm);
      }

      if (genres.length > 0) {
        params.set("genres", genres.join(","));
      }

      if (platforms.length > 0) {
        params.set("platforms", platforms.join(","));
      }

      const response = await fetch(
        `http://localhost:4243/search?${params.toString()}`,
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
  }, [page, searchTerm, genres, platforms]);
  return (
    <div>
      <GameFilter
        minRating={minRating}
        setMinRating={setMinRating}
        sortBy={sortBy}
        setSortBy={setSortBy}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        genres={genres}
        setGenres={setGenres}
        platforms={platforms}
        setPlatforms={setPlatforms}
      />
      <div className="bg-secondary text-primary min-h-screen px-6 py-4">
        <div className="relative grid grid-cols-5 gap-2">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
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
