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
    <div className="flex flex-col">
      <label htmlFor="developer" className="text-white">Developer:</label>
      <Autocomplete
        id="developer"
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
            placeholder="Choose"
            size="small"
            sx={FILTER_SX}
          />
        )}
        sx={{ width: FILTER_WIDTH }}
        slotProps={{
          popupIndicator: {
            tabIndex: 0,
            "aria-label": "Open list of developers",
            sx: {
              "&:focus-visible, &.Mui-focusVisible": {
                outline: "2px solid var(--color-secondary)",
                outlineOffset: "2px",
              },
            },
          },
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

export default DeveloperSelector;
