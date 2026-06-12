import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

type PlatformSelectorProps = {
  platforms: string[];
  setPlatforms: (platforms: string[]) => void;
};

function PlatformSelector({ platforms, setPlatforms }: PlatformSelectorProps) {
  const [platformOptions, setPlatformOptions] = useState<string[]>([]);

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
      options={platformOptions.filter(
        (platform) => !platforms.includes(platform),
      )}
      onChange={(_, value) => {
        if (value) {
          setPlatforms([...platforms, value]);
        }
      }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Add Platform" size="small" />
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

export default PlatformSelector;
