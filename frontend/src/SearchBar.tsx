import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const filterOptions = createFilterOptions({
  limit: 5,
});

const SearchBar = ({ games }) => {
  return (
    <Autocomplete
      sx={{ width: "100%" }}
      options={games}
      filterOptions={filterOptions}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField {...params} label="Search games" size="small" />
      )}
    />
  );
};

export default SearchBar;
