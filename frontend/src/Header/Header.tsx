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
  const iconSize = 18;
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
    "/games": "GoodPlays",
    "/dashboard": "GoodPlays",
    "/profile": "Profile",
    "/terms": "Terms of Service",
    "/privacy": "Privacy Policy",
    "/rating": "Rating System",
    "/accessibility": "Accessibility",
    "/chat": "GoodPlays",
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
    <nav className="bg-primary text-tertiary flex w-full flex-row items-center gap-6 py-2 px-6 sticky top-0 z-50">
      <h1 className="text-tertiary">{pageTitle}</h1>
      <div className="flex items-center gap-5 ml-auto mr-5">
        {myUser && (
          <div className="flex items-center ">
            <button
              type="button"
              aria-label="Toggle search"
              onClick={() => setShowSearch(!showSearch)}
            >
              <FaSearch
                size={iconSize}
                className="text-tertiary hover:text-secondary"
              />
            </button>

            {showSearch && (
              <div className="w-96 ml-5">
                <SearchBar />
              </div>
            )}
          </div>
        )}
        <Link
          to="/"
          className="
            no-underline 
            text-tertiary
            "
        >
          <FaHome
            className="text-tertiary hover:text-secondary"
            size={iconSize}
          />
        </Link>
        {myUsername && (
          <Link
            to={"/user/" + myUsername}
            className="
              no-underline
              rounded-md
              text-[var(--color-tertiary)]
              bg-[var(--color-primary)]
              transition-colors
              "
          >
            <FaUser
              className="text-tertiary hover:text-secondary"
              size={iconSize}
            />
          </Link>
        )}
        {myUsername && (
          <Link
            to="/chat"
            className="
            relative
            no-underline
            rounded-md
            text-[var(--color-tertiary)]
            bg-[var(--color-primary)]
            transition-colors
          "
          >
            <SiWechat
              className="text-tertiary hover:text-secondary"
              size={iconSize}
            />

            {hasUnreadMessages && (
              <span
                className="
                            absolute
                            -top-1
                            -right-1
                            h-3 w-3
                            rounded-full
                            bg-[var(--color-online)]
                            animate-pulse"
              />
            )}
          </Link>
        )}

        {myUsername && (
          <Link
            to="/games"
            className="
              no-underline
              text-tertiary
              "
          >
            <FaGamepad
              className="text-tertiary hover:text-secondary"
              size={iconSize}
            />
          </Link>
        )}
      </div>
    </nav>
  );
}
export default Header;
