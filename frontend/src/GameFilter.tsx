import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

type GameFilterProps = {
  minRating: number;
  setMinRating: (rating: number) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  genres: string[];
  setGenres: (genres: string[]) => void;
};

function GameFilter({
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
  searchTerm,
  setSearchTerm,
  genres,
  setGenres,
}: GameFilterProps) {
  const [genreOptions, setGenreOptions] = useState<string[]>([]);

  useEffect(() => {
    async function fetchGenres() {
      const response = await fetch("http://localhost:4243/games/genres", {
        credentials: "include",
      });

      const result = await response.json();

      if (result.status === "success") {
        setGenreOptions(
          result.data.map((genre: { name: string }) => genre.name),
        );
      }
    }

    fetchGenres();
  }, []);

  return (
    <div className="mb-6 flex flex-wrap items-center gap-4">
      <input
        type="text"
        placeholder="Filter games..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded border px-3 py-2"
      />

      <Autocomplete
        options={genreOptions.filter((genre) => !genres.includes(genre))}
        onChange={(_, value) => {
          if (value) {
            setGenres([...genres, value]);
          }
        }}
        renderInput={(params) => (
          <TextField {...params} placeholder="Add Genre" size="small" />
        )}
        sx={{ width: 250 }}
        slotProps={{
          listbox: {
            sx: {
              maxHeight: 300,
            },
          },
        }}
      />

      <select
        value={minRating}
        onChange={(e) => setMinRating(Number(e.target.value))}
        className="rounded border px-3 py-2"
      >
        <option value={0}>All ratings</option>
        <option value={1}>1+ stars</option>
        <option value={2}>2+ stars</option>
        <option value={3}>3+ stars</option>
        <option value={4}>4+ stars</option>
        <option value={5}>5 stars</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="rounded border px-3 py-2"
      >
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="rating-desc">Highest rated</option>
        <option value="rating-asc">Lowest rated</option>
      </select>

      {genres.length > 0 && (
        <div className="w-full">
          <h3 className="mb-2 font-semibold text-sm">Genres</h3>
          <div className="flex flex-row flex-wrap gap-2">
            {genres.map((genre) => (
              <div
                key={genre}
                className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1"
              >
                <span>{genre}</span>

                <button
                  onClick={() => setGenres(genres.filter((g) => g !== genre))}
                  className="font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GameFilter;
