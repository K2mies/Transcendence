type Conversation = {
  userId: number;
  name: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount?: number;
};

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
    <div className="w-80 shrink-0 overflow-y-auto border-r border-secondary/20 pr-4">
      <h2 className="mb-4 text-lg text-secondary">Conversations</h2>

      {conversations.map((c) => (
        <div
          key={c.userId}
          onClick={() => openChat(c.userId)}
          className="p-3 mb-2 rounded-xl bg-primary/40 cursor-pointer hover:bg-primary/60"
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-2 font-bold text-secondary">
              <span>{c.name}</span>

              {onlineUsers.has(c.userId) && (
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-online)]" />
              )}
            </div>

            {c.unreadCount! > 0 && (
              <span className="text-xs bg-secondary text-primary py-1 px-2 rounded-full">
                {c.unreadCount}
              </span>
            )}
          </div>

          <div className="text-sm opacity-70 truncate">{c.lastMessage}</div>

          <div className="text-xs opacity-50">
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
        </div>
      ))}
    </div>
  );
}
