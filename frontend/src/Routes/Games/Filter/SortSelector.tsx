import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { FILTER_SX } from "./FilterProperties";

type SortSelectorProps = {
  sortBy: string;
  setSortBy: (value: string) => void;
};

function SortSelector({ sortBy, setSortBy }: SortSelectorProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor="sort" className="text-white">Sort results:</label>
      <TextField
        select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        size="small"
        sx={FILTER_SX}
      >
        <MenuItem value="name-asc">Name A-Z</MenuItem>
        <MenuItem value="name-desc">Name Z-A</MenuItem>
        <MenuItem value="rating-desc">Highest rated</MenuItem>
        <MenuItem value="rating-asc">Lowest rated</MenuItem>
      </TextField>
    </div>
  );
}

export default SortSelector;
