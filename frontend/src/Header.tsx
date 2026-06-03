import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import SearchBar from "./SearchBar";

function Header() {
  // const games = [
  //   { title: "Elden Ring" },
  //   { title: "Baldur's Gate 3" },
  //   { title: "Stardew Valley" },
  //   { title: "Left 4 Dead 2" },
  //   { title: "Left 4 Dead" },
  //   { title: "Portal" },
  //   { title: "Portal 2" },
  //   { title: "God of War" },
  //   { title: "Overwatch" },
  //   {
  //     title:
  //       "Counter-Strike: Global Offensive, testing longer game names that go on for a while",
  //   },
  // ];
  return (
    <nav className="header">
      <Link to="/">Home</Link>
      <Link to="/user/xKr4t0sx">Profile</Link>
      <div className="search-container">
        <SearchBar />
      </div>
    </nav>
  );
}
export default Header;
