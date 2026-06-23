import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import UseChat from "../chat/UseChat";
import { FaGamepad } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { SiWechat } from "react-icons/si";
import { useLocation } from "react-router-dom";

type HeaderProps = {
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

function Header({ showSearch, setShowSearch }: HeaderProps) {
  const { conversations } = UseChat();
  const hasUnreadMessages = conversations.some((c) => c.unreadCount > 0);
  const myUser = localStorage.getItem("user");
  let myUsername: string | null = null;
  if (myUser) {
    try {
      myUsername = (JSON.parse(myUser) as { name?: string }).name ?? null;
    } catch {
      myUsername = null;
    }
  }
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/": "Home",
    "/games": "Games",
    "/dashboard": "Dashboard",
    "/profile": "Profile",
    "/mygames": "My Games",
  };

  let pageTitle: string;

  if (location.pathname.startsWith("/user/")) {
    pageTitle = decodeURIComponent(location.pathname.replace("/user/", ""));
  } else if (location.pathname.startsWith("/game/")) {
    pageTitle = decodeURIComponent(location.pathname.replace("/game/", ""));
  } else {
    pageTitle = pageTitles[location.pathname] || "GoodPlays";
  }
  return (
    <nav className="bg-primary text-tertiary flex w-full flex-row items-center gap-6 py-2 px-4 sticky top-0 z-50">
      <h1 className="text-tertiary">{pageTitle}</h1>

      <div className="flex items-center ml-auto">
        <button onClick={() => setShowSearch(!showSearch)}>
          <FaSearch size={16} className="-ml-5" />
        </button>

        {showSearch && (
          <div className=" w-96 ml-5">
            <SearchBar />
          </div>
        )}
      </div>
      <div className="flex items-center gap-6 mr-5">
        <Link
          to="/"
          className="
           no-underline 
           text-tertiary
           "
        >
          <FaHome className="text-tertiary" size={16} />
        </Link>
        {myUsername && (
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
            <FaUser className="text-tertiary" size={15} />
          </Link>
        )}

        <Link
          to="/chat"
          className="
            no-underline
            px-2
            rounded-md
            text-[var(--color-tertiary)]
            bg-[var(--color-primary)]
            transition-colors
          "
        >
        <SiWechat className="text-tertiary" size={18} />

        {hasUnreadMessages && (
          <span className="
                            flex
                            -top-1
                            -right-s
                            h-3 w-3
                            rounded-full
                            bg-[var(--color-online)]
                            animate-pulse"
          />
        )}
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
  );
}
export default Header;
