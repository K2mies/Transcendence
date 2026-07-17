import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel } from "@mui/material";

type RatingSelectorProps = {
  minRating: number;
  setMinRating: (rating: number) => void;
};

function RatingSelector({ minRating, setMinRating }: RatingSelectorProps) {
  return (
    <div className="flex flex-col">
      <InputLabel
        id="rating-label"
        sx={{
          color: "white",
        }}
      >
        Rating:
      </InputLabel>
      <Select
        id="rating"
        labelId="rating-label"
        value={minRating}
        onChange={(e) => setMinRating(Number(e.target.value))}
        size="small"
        sx={{
          width: 145,
          backgroundColor: "var(--app-tertiary)",
        }}
      >
        <MenuItem value={0}>All ratings</MenuItem>
        <MenuItem value={1}>1+ stars</MenuItem>
        <MenuItem value={2}>2+ stars</MenuItem>
        <MenuItem value={3}>3+ stars</MenuItem>
        <MenuItem value={4}>4+ stars</MenuItem>
        <MenuItem value={5}>5 stars</MenuItem>
      </Select>
    </div>
  );
}

export default RatingSelector;
