import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import UseChat from "./chat/UseChat";

function Header()
  {
    const { conversations } = UseChat();
    const hasUnreadMessages = conversations.some((c) => c.unreadCount > 0);

    return (
      <nav className="flex w-full flex-row items-center gap-4 py-2 px-4 bg-[var(--color-primary)] text-[var(--color-tertiary)]">
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

        <Link
          to="/user/xKr4t0sx"
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
        </Link>
        <div className="ml-auto w-[400px] shrink-0">
          <SearchBar />
        </div>
      </nav>
    );
}
export default Header;
