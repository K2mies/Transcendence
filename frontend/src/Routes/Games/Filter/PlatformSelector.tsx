import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
      const response = await fetch("/api/games/platforms", {
        credentials: "include",
      });

      if (!response.ok) {
        toast.custom(() => (
          <div className="rounded-lg bg-[#d32f2f] p-4 text-white">
            <div className="flex items-center gap-2">
              Failed to get available platforms. Please try again.
            </div>
          </div>
        ));
      }

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
    <div className="flex flex-col">
      <label htmlFor="platform" className="text-white">
        Platform:
      </label>
      <Autocomplete
        id="platform"
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
            placeholder="Choose"
            size="small"
            sx={FILTER_SX}
          />
        )}
        sx={{ width: FILTER_WIDTH }}
        slotProps={{
          popupIndicator: {
            tabIndex: 0,
            "aria-label": "Open list of platforms",
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

export default PlatformSelector;
