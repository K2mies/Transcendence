import TextField from "@mui/material/TextField";
import { FILTER_SX } from "./FilterProperties";

type TitleFilterProps = {
  titleTerm: string;
  setTitleTerm: (value: string) => void;
};

function TitleFilter({ titleTerm, setTitleTerm }: TitleFilterProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor="title" className="text-white">Title:</label>
      <TextField
        value={titleTerm}
        onChange={(e) => setTitleTerm(e.target.value)}
        placeholder="Type title..."
        id="title"
        size="small"
        sx={FILTER_SX}
      />
    </div>
  );
}

export default TitleFilter;
