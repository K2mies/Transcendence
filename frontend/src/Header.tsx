import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { FaGamepad } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/": "Home",
    "/games": "Games",
    "/dashboard": "Dashboard",
    "/profile": "Profile",
    "/mygames": "My Games",
  };

  const pageTitle = pageTitles[location.pathname] || "GoodPlays";

  return (
    <div>
      <nav className="bg-primary text-tertiary flex w-full flex-row items-center gap-6 py-2 px-4 sticky top-0 z-50">
        <h1 className="bg-primary text-tertiary">{pageTitle}</h1>

        <div className="flex items-center ml-auto">
          <button onClick={() => setShowSearch(!showSearch)}>
            <FaSearch size={18} />
          </button>

          {showSearch && (
            <div className=" w-96">
              <SearchBar />
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="
            no-underline 
            text-tertiary
            "
          >
            <FaHome className="text-tertiary" size={16} />
          </Link>

          <Link
            to="/user/xKr4t0sx"
            className="
            no-underline
            text-tertiary
            "
          >
            <FaUser className="text-tertiary" size={15} />
          </Link>

          <Link
            to="/games"
            className="
            no-underline
            text-tertiary
            "
          >
            <FaGamepad className="text-tertiary" size={18} />
          </Link>
        </div>
      </nav>
    </div>
  );
}
export default Header;
