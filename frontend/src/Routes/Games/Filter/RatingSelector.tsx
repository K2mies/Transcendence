import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { FILTER_SX } from "./FilterProperties";

type RatingSelectorProps = {
  minRating: number;
  setMinRating: (rating: number) => void;
};

function RatingSelector({ minRating, setMinRating }: RatingSelectorProps) {
  return (
    <TextField
      select
      value={minRating}
      onChange={(e) => setMinRating(Number(e.target.value))}
      size="small"
      sx={FILTER_SX}
    >
      <MenuItem value={0}>All ratings</MenuItem>
      <MenuItem value={1}>1+ stars</MenuItem>
      <MenuItem value={2}>2+ stars</MenuItem>
      <MenuItem value={3}>3+ stars</MenuItem>
      <MenuItem value={4}>4+ stars</MenuItem>
      <MenuItem value={5}>5 stars</MenuItem>
    </TextField>
  );
}

export default RatingSelector;
