import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";

type SortSelectorProps = {
  sortBy: string;
  setSortBy: (value: string) => void;
};

function SortSelector({ sortBy, setSortBy }: SortSelectorProps) {
  return (
    <div className="flex flex-col">
      <InputLabel
        id="sort-label"
        htmlFor="sort-input"
        sx={{
          color: "white",
        }}
      >
        Sort by:
      </InputLabel>
      <Select
        labelId="sort-label"
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        size="small"
        sx={{
          width: 145,
          backgroundColor: "var(--app-tertiary)",
        }}
        inputProps={{ id: "sort-input", name: "sort" }}
      >
        <MenuItem value="name-asc">Name A-Z</MenuItem>
        <MenuItem value="name-desc">Name Z-A</MenuItem>
        <MenuItem value="rating-desc">Highest rated</MenuItem>
        <MenuItem value="rating-asc">Lowest rated</MenuItem>
      </Select>
    </div>
  );
}

export default SortSelector;
