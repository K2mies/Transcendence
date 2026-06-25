import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { FILTER_SX } from "./FilterProperties";
import { FILTER_WIDTH } from "./FilterProperties";

type PlatformSelectorProps = {
  platforms: string[];
  setPlatforms: (platforms: string[]) => void;
};

function PlatformSelector({ platforms, setPlatforms }: PlatformSelectorProps) {
  const [platformOptions, setPlatformOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlatforms() {
      const response = await fetch("http://localhost:4243/games/platforms", {
        credentials: "include",
      });

      const result = await response.json();

      if (result.status === "success") {
        setPlatformOptions(
          result.data.map((platform: { name: string }) => platform.name),
        );
      }
    }

    fetchPlatforms();
  }, []);

  return (
    <Autocomplete
      value={selectedValue}
      inputValue={inputValue}
      options={platformOptions.filter(
        (platform) => !platforms.includes(platform),
      )}
      onInputChange={(_, value) => {
        setInputValue(value);
      }}
      onChange={(_, value) => {
        if (value) {
          setPlatforms([...platforms, value]);
          setSelectedValue(null);
          setInputValue(""); // clear text field
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Platform"
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

export default PlatformSelector;
