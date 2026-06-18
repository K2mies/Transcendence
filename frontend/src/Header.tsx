import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header({ currUser }) {
  return (
    <nav className="flex w-full flex-row items-center gap-4 py-2 px-4 bg-primary text-tertiary">
      <Link
        to="/"
        className="
    no-underline
    px-2
    rounded-md
    text-tertiary
    bg-primary
    transition-colors
  "
      >
        GoodPlays
      </Link>
      {currUser && (
        <Link
          to={"/user/" + currUser}
          className="
      no-underline
      px-2
      rounded-md
      text-tertiary
      bg-color-primary
      transition-colors
    "
        >
          Profile
        </Link>
      )}
      <div className="ml-auto w-100px] shrink-0">
        <SearchBar />
      </div>
    </nav>
  );
}

export default Header;
