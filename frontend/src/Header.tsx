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
    <nav className="bg-primary text-tertiary flex w-full flex-row items-center gap-4 py-2 px-4 sticky top-0 z-50">
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
    {myUsername &&
        <Link
          to={"/user/" + myUsername}
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
    }
      <div className="ml-auto w-[400px] shrink-0">
        <SearchBar />
      </div>
    </nav>
  );
}
export default Header;
