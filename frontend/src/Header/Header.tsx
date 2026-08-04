import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import UseChat from "../Chat/UseChat";
import Logout from "../Registration/Logout";
import { FaGamepad } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { SiWechat } from "react-icons/si";
import { useLocation } from "react-router-dom";
import { useCurrentUser } from "../Auth/CurrentUserContext";

type HeaderProps = {
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  myCurrUser: string | undefined;
  setMyCurrUser: (myCurrUser: string | undefined) => void;
  isUserFound: boolean | undefined;
  isGameFound: boolean | undefined;
};

function Header({
  showSearch,
  setShowSearch,
  myCurrUser,
  setMyCurrUser,
  isUserFound,
  isGameFound,
}: HeaderProps) {
  const iconSize = 18;
  const { conversations } = UseChat();
  const hasUnreadMessages = conversations.some((c) => c.unreadCount > 0);
  const location = useLocation();
  const { currentUser } = useCurrentUser();

  const pageTitles: Record<string, string> = {
    "/": "Home",
    "/games": "GoodPlays",
    "/dashboard": "GoodPlays",
    "/terms": "Terms of Service",
    "/privacy": "Privacy Policy",
    "/rating": "Rating System",
    "/accessibility": "Accessibility",
    "/chat": "GoodPlays",
  };

  let pageTitle: string;

  if (location.pathname.startsWith("/user/") && isUserFound === true) {
    pageTitle = decodeURIComponent(location.pathname.replace("/user/", ""));
  } else if (location.pathname.startsWith("/game/") && isGameFound === true) {
    pageTitle = decodeURIComponent(location.pathname.replace("/game/", ""));
  } else {
    pageTitle = pageTitles[location.pathname] || "GoodPlays";
  }
  return (
    <nav className="bg-primary text-tertiary flex w-full flex-row items-center gap-6 py-2 px-6 sticky top-0 z-50">
      <h1 className="text-tertiary">{pageTitle}</h1>
      <div className="flex items-center gap-5 ml-auto mr-5">
        {myCurrUser && (
          <div className="flex items-center ">
            <button
              type="button"
              aria-label="Toggle search"
              onClick={() => setShowSearch(!showSearch)}
            >
              <FaSearch
                size={iconSize}
                className="text-tertiary hover:text-secondary"
                aria-hidden="true"
                focusable="false"
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
          aria-label="Go to dashboard"
        >
          <FaHome
            className="text-tertiary hover:text-secondary"
            size={iconSize}
            aria-hidden="true"
            focusable="false"
          />
        </Link>
        {myCurrUser && (
          <Link
            to={"/user/" + myCurrUser}
            className="
              no-underline
              rounded-md
              text-tertiary
              bg-primary
              transition-colors
              "
            aria-label="Go to your profile"
          >
            <FaUser
              className="text-tertiary hover:text-secondary"
              size={iconSize}
              aria-hidden="true"
              focusable="false"
            />
          </Link>
        )}
        {myCurrUser && (
          <Link
            to="/chat"
            className="
            relative
            no-underline
            rounded-md
            text-tertiary
            bg-primary
            transition-colors
            "
            aria-label={
              hasUnreadMessages ? "Open chat, unread messages" : "Open chat"
            }
          >
            <SiWechat
              className="text-tertiary hover:text-secondary"
              size={iconSize}
              aria-hidden="true"
              focusable="false"
            />

            {hasUnreadMessages && (
              <span
                className="
                            absolute
                            -top-1
                            -right-1
                            h-3 w-3
                            rounded-full
                            bg-online
                            animate-pulse"
              />
            )}
          </Link>
        )}

        {myCurrUser && (
          <Link
            to="/games"
            className="
              no-underline
              text-tertiary
              "
            aria-label="Go to Games page"
          >
            <FaGamepad
              className="text-tertiary hover:text-secondary"
              size={iconSize}
              aria-hidden="true"
              focusable="false"
            />
          </Link>
        )}

        {(currentUser?.role === "ADMIN" ||
          currentUser?.role === "SUPERUSER") && (
          <Link
            to="/admin"
            className="
              no-underline
              text-tertiary
              "
          >
            <FaUserShield
              className="text-tertiary hover:text-secondary"
              size={iconSize + 4}
            />
          </Link>
        )}

        {myCurrUser && <Logout setMyCurrUser={setMyCurrUser}></Logout>}
      </div>
    </nav>
  );
}
export default Header;
