import { useEffect, useState } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import toast from "react-hot-toast";

type User = {
  id: number;
  name: string;
};

const filterOptions = createFilterOptions<User>({
  limit: 6000,
});

type Props = {
  onSelectUser: (userId: number) => void;
};

const UserSearchBar = ({ onSelectUser }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("http://localhost:4243/user/friends", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        toast.custom(() => (
          <div className="rounded-lg bg-[#d32f2f] p-4 text-white">
            <div className="flex items-center gap-2">
              Failed to get list of friends. Please try again.
            </div>
          </div>
        ));
      }
      const result = await res.json();
      // expected: [{ id, name }]
      setUsers(Array.isArray(result) ? result : []);
    }

    fetchUsers();
  }, []);

  return (
    <>
      <Autocomplete<User>
        sx={{ width: "25%", maxWidth: "20rem" }}
        options={users}
        value={selectedValue}
        inputValue={inputValue}
        filterOptions={filterOptions}
        getOptionLabel={(option) => option.name}
        onChange={(_, value) => {
          if (value) {
            onSelectUser(value.id);
            setSelectedValue(null);
            setInputValue("");
          }
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        slotProps={{
          popupIndicator: {
            tabIndex: 0,
            "aria-label": "Open list of friends",
            sx: {
              "&:focus-visible, &.Mui-focusVisible": {
                outline: "2px solid var(--color-secondary)",
                outlineOffset: "2px",
              },
            },
          },
          listbox: {
            sx: { maxHeight: 300 },
          },
        }}
        renderInput={(params) => (
          <>
            <label htmlFor={params.id} className="sr-only">
              Search for a friend to chat
            </label>
            <TextField
              {...params}
              placeholder="Search for a friend to chat"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "var(--color-tertiary)",
                  fontSize: "0.875rem",
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
          </>
        )}
      />
    </>
  );
};

export default UserSearchBar;
