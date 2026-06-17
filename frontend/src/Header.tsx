import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header() {
  const myUser = localStorage.getItem("user");
  let myUsername: string | null = null;
  if (myUser) {
    try {
      myUsername = (JSON.parse(myUser) as { name?: string }).name ?? null;
    } catch {
      myUsername = null;
    }
  }
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
    {myUsername &&
        <Link
          to={"/user/" + myUsername}
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
    }
      <div className="ml-auto w-100px] shrink-0">
        <SearchBar />
      </div>
    </nav>
  );
}
export default Header;
