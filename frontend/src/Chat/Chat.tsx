import { useEffect, useRef, useState } from "react";
import UserSearchBar from "./ChatSearchBar";
import ProfileSearchBar from "./ProfileSearchBar";
import UseChat from "./UseChat";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const {
    me,
    conversations,
    setConversations,
    sendMessage,
    markAsRead,
    lastMessage,
    onlineUsers,
  } = UseChat();

  const selectedUserRef = useRef<number | null>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [text, setText] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement | null>(null);

  // ---------------- OPEN PROFILE ----------------
  function openProfile(name: string) {
    navigate(`/user/${name}`);
  }

  // ---------------- OPEN CHAT ----------------
  async function openChat(userId: number) {
    setSelectedUser(userId);
    selectedUserRef.current = userId;

    const res = await fetch(`http://localhost:4243/message/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    if (Array.isArray(data) && data.length === 0) {
      const friends = await fetch(`http://localhost:4243/user/friends`, {
        method: "GET",
        credentials: "include",
      });

      const friendsdata = await friends.json();
      const friend = Array.isArray(friendsdata)
        ? friendsdata.find((friend: any) => friend.id === userId)
        : undefined;

      setConversations((prev) => {
        if (!friend) return prev;
        const exists = prev.some((c) => c.userId === friend.id);

        if (exists) return prev;

        return [
          {
            userId: friend.id,
            name: friend.name,
          },
          ...prev,
        ];
      });
    }
    setMessages(Array.isArray(data) ? data : []);

    await markAsRead(userId);

    requestAnimationFrame(() => {
      const container = messagesContainerRef.current;
      if (!container) return;

      container.scrollTop = container.scrollHeight;
    });
  }

  function send() {
    if (!selectedUser || !text.trim()) return;

    sendMessage(selectedUser, text);

    setText("");

    inputRef.current?.focus();
  }

  // ---------------- MESSAGES AUTO-SCROLL ----------------
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight <
      100;

    if (isNearBottom) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "auto",
      });
    }
  }, [messages]);

  useEffect(() => {
    if (!lastMessage || !selectedUser) return;

    const belongsToCurrentChat =
      (lastMessage.senderId === selectedUser &&
        lastMessage.receiverId === me.id) ||
      (lastMessage.senderId === me.id &&
        lastMessage.receiverId === selectedUser);

    if (!belongsToCurrentChat) return;

    setMessages((prev) => [...prev, lastMessage]);

    if (lastMessage.senderId === selectedUser) markAsRead(selectedUser);
  }, [lastMessage, selectedUser, me]);

  if (!me) {
    return <div className="text-black p-6">Loading chat...</div>;
  }

  return (
    <>
      <title>GoodPlays: Chat</title>
      <div className="relative min-h-screen overflow-hidden bg-primary">
        <div className="relative z-10 p-6 text-tertiary">
          <div className="flex items-center justify-between">
            <UserSearchBar onSelectUser={openChat} />
            <ProfileSearchBar onSelectUser={openProfile} />
          </div>

          <div className="flex flex-1 min-h-0">
            {/* LEFT */}
            <div className="w-80 border-r border-secondary/20 overflow-y-auto p-4">
              <h2 className="mb-4 text-lg text-secondary">Conversations</h2>

              {conversations.map((c) => (
                <button
                  key={c.userId}
                  onClick={() => openChat(c.userId)}
                  className="p-3 mb-2 rounded-xl bg-primary/40 cursor-pointer hover:bg-primary/60"
                >
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2 font-bold text-secondary">
                      <span>{c.name}</span>

                      {onlineUsers.has(c.userId) && (
                        <span className="h-2.5 w-2.5 rounded-full bg-online" />
                      )}
                    </div>

                    {c.unreadCount > 0 && (
                      <span className="text-xs bg-secondary text-primary py-1 px-2 rounded-full">
                        {c.unreadCount}
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-left text-white opacity-70 truncate">
                    {c.lastMessage}
                  </div>

                  <div className="text-xs text-white opacity-50">
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

            {/* RIGHT */}
            <div className="flex flex-col flex-1">
              <div className="p-4 border-b border-secondary/20">
                <h2 className="text-secondary">
                  {selectedUser
                    ? `Chat with ${conversations.find((c) => c.userId === selectedUser)?.name || "User"}`
                    : "Select a chat"}
                </h2>
              </div>
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-3"
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
                    <div className="whitespace-pre-wrap break-words max-w-xs p-3 rounded-xl">
                      {msg.content}
                    </div>
                    <div className="text-xs opacity-80">
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
              {selectedUser && (
                <div className="p-4 border-t border-secondary/20 flex gap-2">
                  <input
                    aria-label="Type a new message"
                    ref={inputRef}
                    value={text}
                    maxLength={120}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 rounded bg-primary/40 outline-none placeholder:text-white"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        send();
                      }
                    }}
                  />

                  <button
                    onClick={send}
                    className="px-4 py-2 bg-secondary text-primary rounded"
                  >
                    Send
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
