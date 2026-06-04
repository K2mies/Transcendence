import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import SearchBar from "./SearchBar";

function Header() {
  return (
    <nav className="flex w-full flex-row items-center gap-4 p-4">
      <Link to="/">GoodPlays</Link>

      <Link to="/user/xKr4t0sx">Profile</Link>

      <div className="ml-auto w-[400px] shrink-0">
        <SearchBar />
      </div>
    </nav>
  );
}
export default Header;
