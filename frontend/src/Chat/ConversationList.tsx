import type { Conversation } from "../Types/ChatType";

type ConversationListProps = {
  conversations: Conversation[];
  onlineUsers: Set<number>;
  openChat: (userId: number) => void;
};

export default function ConversationList({
  conversations,
  onlineUsers,
  openChat,
}: ConversationListProps) {
  return (
    <div className="w-1/4 shrink-0 overflow-y-auto border-r border-secondary/20 pr-4">
      <h2 className="mb-4 text-sm md:text-lg  text-secondary">Conversations</h2>

      {conversations.map((c) => (
        <button
          key={c.userId}
          aria-label={`Open conversation with ${c.name}${
            c.unreadCount > 0 ? `. ${c.unreadCount} unread messages.` : ""
            }${onlineUsers.has(c.userId) ? " User is online." : ""
          }`}
          tabIndex={0}
          onClick={() => openChat(c.userId)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") openChat(c.userId);
          }}
          className="p-3 mb-2 rounded-xl bg-primary/40 cursor-pointer hover:bg-primary/60"
        >
          <div className="flex justify-between">
            <div className="flex items-center font-bold text-secondary min-w-0 flex-1">
              <span className="truncate">{c.name}</span>

              {onlineUsers.has(c.userId) && (
                <span className="h-2.5 w-2.5 rounded-full bg-online shrink-0 ml-auto" />
              )}
            </div>
            {c.unreadCount! > 0 && (
              <span className="text-xs bg-secondary text-primary py-1 px-2 rounded-full shrink-0">
                {c.unreadCount}
              </span>
            )}
          </div>

          <div className="text-sm opacity-70 truncate text-left">{c.lastMessage}</div>

          <div className="text-xs opacity-50 text-left">
            {c.lastMessageAt
              ? new Date(c.lastMessageAt).toLocaleString("en-GB", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : ""}
          </div>
        </button>
      ))}
    </div>
  );
}
