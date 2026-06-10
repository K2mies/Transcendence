import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
<<<<<<< HEAD
  const [games, setGames] = useState<{ id: number; name: string; image: string }[]>([]);
=======
  const [games, setGames] = useState<Game[]>([]);
>>>>>>> 13113ee (fixed value.name error by creating a Game type and feeding that into a few places)
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
      sx={{ width: "100%" }}
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
