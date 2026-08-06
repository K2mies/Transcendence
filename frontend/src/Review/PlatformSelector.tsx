import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

type PlatformSelectorProps = {
  platform: string | null;
  setPlatform: (platform: string | null) => void;
  platforms: string[];
};

function PlatformSelector({
  platform,
  setPlatform,
  platforms,
}: PlatformSelectorProps) {
  return (
    <Autocomplete
      value={platform}
      options={platforms}
      onChange={(_, value) => {
        setPlatform(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Platform..."
          size="small"
          sx={{
            "& .MuiInputLabel-root": {
              color: "var(--color-primary)",
            },

            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--color-primary)",
            },

            "& .MuiOutlinedInput-root": {
              height: 36,

              // Background colour
              backgroundColor: "var(--color-tertiary)",

              // Text colour
              color: "var(--color-primary)",

              // Border
              "& fieldset": {
                borderColor: "var(--color-secondary)",
                borderWidth: "4px",
              },

              "&:hover fieldset": {
                borderColor: "var(--color-secondary)",
                borderWidth: "4px",
              },

              "&.Mui-focused fieldset": {
                borderColor: "var(--color-secondary)",
                borderWidth: "4px",
              },

              // Input text
              "& input": {
                color: "var(--color-primary)",
                borderWidth: "4px",
              },

              // Placeholder
              "& input::placeholder": {
                color: "var(--color-secondary)",
                opacity: 1,
              },
            },

            // Dropdown arrow
            "& .MuiSvgIcon-root": {
              color: "var(--color-secondary)",
            },
          }}
        />
      )}
      sx={{ width: 220 }}
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

            // Entire dropdown background
            backgroundColor: "var(--color-tertiary)",
            color: "var(--color-primary)",

            // Every option
            "& .MuiAutocomplete-option": {
              color: "var(--color-primary)",
            },

            // Hovered option
            "& .MuiAutocomplete-option.Mui-focused": {
              backgroundColor: "var(--color-secondary)",
              color: "var(--color-tertiary)",
            },

            // Selected option
            "& .MuiAutocomplete-option[aria-selected='true']": {
              backgroundColor: "var(--color-secondary)",
              color: "var(--color-tertiary)",
            },

            // Selected + hovered
            "& .MuiAutocomplete-option[aria-selected='true'].Mui-focused": {
              backgroundColor: "var(--color-secondary)",
              color: "var(--color-tertiary)",
            },
          },
        },
      }}
    />
  );
}

export default PlatformSelector;
