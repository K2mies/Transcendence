import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Button from "@mui/material/Button";

function Header() {
  return (
    <nav className="flex w-full flex-row items-center gap-4 py-2 px-4 bg-[var(--color-primary)] text-[var(--color-tertiary)]">
      <Link
        to="/"
        className="
    no-underline
    px-2
    rounded-md
    text-[var(--color-tertiary)]
    bg-[var(--color-primary)]
    transition-colors
  "
      >
        GoodPlays
      </Link>

      <Link
        to="/user/xKr4t0sx"
        className="
    no-underline
    px-2
    rounded-md
    text-[var(--color-tertiary)]
    bg-[var(--color-primary)]
    transition-colors
  "
      >
        Profile
      </Link>
      <div className="ml-auto w-[400px] shrink-0">
        <SearchBar />
      </div>
    </nav>
  );
}
export default Header;
