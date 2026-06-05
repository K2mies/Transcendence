import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const filterOptions = createFilterOptions({
  limit: 4,
});

const SearchBar = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
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
    <Autocomplete
      sx={{ width: "100%" }}
      options={games}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.name}
      onChange={(event, value) => {
        if (value) {
          navigate(`/game/${encodeURIComponent(value.name)}`);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search games"
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
