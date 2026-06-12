// GenreFilter.tsx
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

type GenreFilterProps = {
  genres: string[];
  setGenres: (genres: string[]) => void;
};

function GenreFilter({ genres, setGenres }: GenreFilterProps) {
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
    <>
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

      {genres.length > 0 && (
        <div className="w-full">
          <h3 className="mb-2 text-sm font-semibold">Genres</h3>

          <div className="flex flex-row flex-wrap gap-2">
            {genres.map((genre) => (
              <div
                key={genre}
                className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1"
              >
                <span>{genre}</span>

                <button
                  type="button"
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
    </>
  );
}

export default GenreFilter;
