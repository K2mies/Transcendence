import { RefObject } from "react";

type MessageListProps = {
  me: any;
  messages: any[];
  messagesContainerRef: RefObject<HTMLDivElement | null>;
};

export default function MessageList({
  me,
  messages,
  messagesContainerRef,
}: MessageListProps) {
  return (
    <div
      ref={messagesContainerRef}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0"
    >
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`max-w-xs p-3 rounded-xl ${
            msg.senderId === me?.id
              ? "bg-secondary text-primary ml-auto"
              : "bg-tertiary/40"
          }`}
        >
          <div className="whitespace-pre-wrap break-words">{msg.content}</div>

          <div className="text-xs opacity-60">
            {msg.createdAt
              ? new Date(msg.createdAt).toLocaleString("en-GB", {
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
