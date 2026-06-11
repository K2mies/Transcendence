import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import UseChat from "./chat/UseChat";

function Header() {
  const { conversations } = UseChat();
  const hasUnreadMessages = conversations.some((c) => c.unreadCount > 0);

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
          <FaSearch size={18} className="-mr-2" />
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
        Chat

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
