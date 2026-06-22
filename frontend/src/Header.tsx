import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Logout from "./Logout";

function Header({ myCurrUser, setMyCurrUser }) {
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
      {myCurrUser && (
        <Link
          to={"/user/" + myCurrUser}
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
      <div className="ml-auto w-100 shrink-0">
        <SearchBar />
      </div>
      {myCurrUser && (
        <button type="button" onClick={Logout}>
          Log out
        </button>
      )}
    </nav>
  );
}

export default Header;
