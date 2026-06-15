import TextField from "@mui/material/TextField";
import { FILTER_SX } from "./FilterProperties";

type TitleFilterProps = {
  titleTerm: string;
  setTitleTerm: (value: string) => void;
};

function TitleFilter({ titleTerm, setTitleTerm }: TitleFilterProps) {
  return (
    <TextField
      value={titleTerm}
      onChange={(e) => setTitleTerm(e.target.value)}
      placeholder="Title..."
      size="small"
      sx={FILTER_SX}
    />
  );
}

export default TitleFilter;
