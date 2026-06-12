import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

type GenreSelectorProps = {
  genres: string[];
  setGenres: (genres: string[]) => void;
};

function GenreSelector({ genres, setGenres }: GenreSelectorProps) {
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
  );
}

export default GenreSelector;
