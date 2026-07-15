import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FILTER_SX } from "./FilterProperties";
import { FILTER_WIDTH } from "./FilterProperties";

type GenreSelectorProps = {
  genres: string[];
  setGenres: (genres: string[]) => void;
};

function GenreSelector({ genres, setGenres }: GenreSelectorProps) {
  const [genreOptions, setGenreOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

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
    <div className="flex flex-col">
      <label htmlFor="genre" className="text-white">Genre:</label>
      <Autocomplete
        id="genre"
        value={selectedValue}
        inputValue={inputValue}
        onInputChange={(_, value) => {
          setInputValue(value);
        }}
        options={genreOptions.filter((genre) => !genres.includes(genre))}
        onChange={(_, value) => {
          if (value) {
            setGenres([...genres, value]);
            setSelectedValue(null);
            setInputValue(""); // clear text field
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            role="combobox"
            placeholder="Choose"
            size="small"
            sx={FILTER_SX}
          />
        )}
        sx={{ width: FILTER_WIDTH }}
        slotProps={{
          listbox: {
            sx: {
              maxHeight: 300,
            },
          },
        }}
      />
    </div>
  );
}

export default GenreSelector;
