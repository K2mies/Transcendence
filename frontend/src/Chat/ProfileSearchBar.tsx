import { useEffect, useState } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

type User = {
  id: number;
  name: string;
};

const filterOptions = createFilterOptions<User>({
  limit: 6000,
});

type Props = {
  onSelectUser: (name: string) => void;
};

const ProfileSearchBar = ({ onSelectUser }: Props) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(`http://localhost:4243/user/all`, {
        method: "GET",
        credentials: "include",
      });

      const result = await res.json();
      setUsers(Array.isArray(result) ? result : []);
    }

    fetchUsers();
  }, []);

  return (
    <Autocomplete<User>
      id="profile-search"
      sx={{ width: "25%" }}
      options={users}
      tabIndex={0}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option?.name ?? ""}
      onChange={(_, value) => {
        if (value) {
          onSelectUser(value.name);
        }
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      slotProps={{
        popupIndicator: {
          "aria-label": "Open profile search suggestions",
          "tabIndex": 0,
          sx: {
            "&:focus": {
              outline: "2px solid var(--color-secondary)",
              outlineOffset: "2px",
            },
            "&:focus-visible": {
              outline: "2px solid var(--color-secondary)",
              outlineOffset: "2px",
            },
            "&.Mui-focusVisible": {
              outline: "2px solid var(--color-secondary)",
              outlineOffset: "2px",
            },
          }
        },
        listbox: {
          sx: { maxHeight: 300 },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a user profile..."
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
            borderRadius: 10,
          }}
        />
      )}
    />
  );
};

export default ProfileSearchBar;
