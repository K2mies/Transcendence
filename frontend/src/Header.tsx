import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Button from "@mui/material/Button";

function Header() {
  return (
    <nav className="flex w-full flex-row items-center gap-4 p-4 bg-[#242424] text-[#cfcccc] rounded-2xl ">
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{
          textTransform: "none",
          backgroundColor: "var(--color-primary)",
          "&:hover": {
            backgroundColor: "var(--color-secondary)",
          },
        }}
      >
        GoodPlays
      </Button>

      <Button
        component={Link}
        to="/user/xKr4t0sx"
        variant="contained"
        sx={{
          textTransform: "none",
          backgroundColor: "var(--color-primary)",
          "&:hover": {
            backgroundColor: "var(--color-secondary)",
          },
        }}
      >
        Profile
      </Button>

      <div className="ml-auto w-[400px] shrink-0">
        <SearchBar />
      </div>
    </nav>
  );
}
export default Header;
