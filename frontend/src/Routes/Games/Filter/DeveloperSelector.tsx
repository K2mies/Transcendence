import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FILTER_SX } from "./FilterProperties";
import { FILTER_WIDTH } from "./FilterProperties";

type DeveloperSelectorProps = {
  developer: string;
  setDeveloper: (developer: string) => void;
};

function DeveloperSelector({
  developer,
  setDeveloper,
}: DeveloperSelectorProps) {
  const [developerOptions, setDeveloperOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function fetchDevelopers() {
      const response = await fetch("http://localhost:4243/games/developers", {
        credentials: "include",
      });

      const result = await response.json();

      if (result.status === "success") {
        setDeveloperOptions(
          result.data.map((dev: { developer: string }) => dev.developer),
        );
      }
    }

    fetchDevelopers();
  }, []);

  return (
    <Autocomplete
      value={null}
      inputValue={inputValue}
      options={developerOptions.filter((dev) => dev !== developer)}
      onInputChange={(_, value) => {
        setInputValue(value);
      }}
      onChange={(_, value) => {
        if (value) {
          setDeveloper(value);
          setInputValue("");
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Developer"
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
  );
}

export default DeveloperSelector;
