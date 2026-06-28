import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

type Game = {
  id: number;
  name: string;
};

const filterOptions = createFilterOptions<Game>({
  limit: 6000,
});

const SearchBar = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState<
    { id: number; name: string; image: string }[]
  >([]);
  const location = useLocation();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setSelectedGame(null);
    setInputValue("");
  }, [location.pathname]);

  useEffect(() => {
    async function fetchGames() {
      const response = await fetch("http://localhost:4243/games", {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();

      if (result.status === "success") {
        setGames(result.data);
      }
    }

    fetchGames();
  }, []);
  return (
    <Autocomplete<Game>
      value={selectedGame}
      sx={{ width: "100%" }}
      inputValue={inputValue}
      onInputChange={(_, value) => {
        setInputValue(value);
      }}
      options={games}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.name}
      slotProps={{
        listbox: {
          sx: {
            maxHeight: 400,
          },
        },
      }}
      onChange={(_, value) => {
        setSelectedGame(value);

        if (value) {
          navigate(`/game/${encodeURIComponent(value.name)}`);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search games"
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "var(--color-tertiary)",
              "& fieldset": {
                borderColor: "var(--color-primary)",
              },
              "&:hover fieldset": {
                borderColor: "var(--color-secondary)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--color-secondary)",
              },
            },
            "& .MuiInputLabel-root": {
              color: "var(--color-primary)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--color-secondary)",
            },
            borderRadius: 10,
          }}
        />
      )}
    />
  );
};

export default SearchBar;
