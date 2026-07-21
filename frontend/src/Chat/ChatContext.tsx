import { createContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaUserFriends } from "react-icons/fa";
import FriendRequestToast from "./FriendRequestToast";
import { FRIEND_ICON_SIZE } from "./NotificationConstants";
import NotificationUserLink from "./NotificationUserLink";

type Conversation = {
  userId: number;
  name: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount?: number;
};

type ChatContextType = {
  me: any | null;
  friends: any | null;
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  sendMessage: (receiverId: number, content: string) => void;
  markAsRead: (userId: number) => Promise<void>;
  closeSocket: () => void;
  lastMessage: any;
  onlineUsers: Set<number>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const wsRef = useRef<WebSocket | null>(null);
  const friendsMapRef = useRef<Map<number, string>>(new Map());

  const [me, setMe] = useState<any>(null);
  const [friends, setFriends] = useState<Map<number, string>>(new Map());
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState(new Set<number>());

  async function init() {
    try {
      const meRes = await fetch("http://localhost:4243/user/me", {
        credentials: "include",
      });

      if (!meRes.ok) {
        throw new Error("Not authenticated yet");
      }

      const meData = await meRes.json();
      setMe(meData.user);

      const [convRes, friendsRes] = await Promise.all([
        fetch("http://localhost:4243/message/conversations", {
          credentials: "include",
        }),
        fetch("http://localhost:4243/user/friends", {
          credentials: "include",
        }),
      ]);

      const convData = await convRes.json();
      const friendsData = await friendsRes.json();

      const safeFriends = Array.isArray(friendsData) ? friendsData : [];

      const friendsMap = new Map(safeFriends.map((f: any) => [f.id, f.name]));
      setFriends(friendsMap);
      friendsMapRef.current = friendsMap;

      const safeConv = Array.isArray(convData) ? convData : [];

      setConversations(
        safeConv.map((c: any) => ({
          ...c,
          name: friendsMap.get(c.userId) ?? "Unknown",
        })),
      );
    } catch (err) {
      setMe(null);
    }
  }

  // ---------------- GET MY FRIENDS ----------------
  async function getFriends() {
    const friendsRes = await fetch("http://localhost:4243/user/friends", {
      credentials: "include",
    });
    const friendsData = await friendsRes.json();
    const safeFriends = Array.isArray(friendsData) ? friendsData : [];
    const friendsMap = new Map(safeFriends.map((f: any) => [f.id, f.name]));
    setFriends(friendsMap);
  }

  // ---------------- INIT ----------------
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    function reload() {
      init();
    }

    window.addEventListener("auth-changed", reload);
    return () => window.removeEventListener("auth-changed", reload);
  }, []);

  // ---------------- WEBSOCKET ----------------
  useEffect(() => {
    if (!me?.id) return;

    const ws = new WebSocket("ws://localhost:4243");
    wsRef.current = ws;

    ws.onmessage = (e) => {
      let data: any;
      try {
        data = JSON.parse(e.data);
      } catch {
        return;
      }

      switch (data.type) {
        case "online-users":
          setOnlineUsers(new Set(Array.isArray(data.users) ? data.users : []));
          getFriends();
          break;

        case "user-online":
          setOnlineUsers((prev) => {
            const next = new Set(prev);
            next.add(data.userId);
            return next;
          });
          break;

        case "user-offline":
          setOnlineUsers((prev) => {
            const next = new Set(prev);
            next.delete(data.userId);
            return next;
          });
          init();
          break;

        case "friend-request":
          toast.custom((t) => (
            <FriendRequestToast
              toastId={t.id}
              senderId={data.senderId}
              senderName={data.senderName}
            />
          ));
          break;

        case "friend-request-accepted":
          toast.custom((t) => (
            <div className="rounded-lg bg-primary p-4 text-tertiary">
              <div className="flex items-center gap-2">
                <FaUserFriends
                  size={FRIEND_ICON_SIZE}
                  className="text-tertiary"
                />

                <div>
                  <NotificationUserLink
                    toastId={t.id}
                    username={data.accepterName}
                  />{" "}
                  accepted your friend request.
                </div>
              </div>
            </div>
          ));
          break;

        case "friend-request-declined":
          toast.custom((t) => (
            <div className="rounded-lg bg-primary p-4 text-tertiary">
              <div className="flex items-center gap-2">
                <FaUserFriends
                  size={FRIEND_ICON_SIZE}
                  className="text-tertiary"
                />

                <div>
                  <NotificationUserLink
                    toastId={t.id}
                    username={data.declinerName}
                  />{" "}
                  declined your friend request.
                </div>
              </div>
            </div>
          ));
          break;

        case "chat":
          setLastMessage(data);

          const otherUser =
            data.senderId === me.id ? data.receiverId : data.senderId;

          setConversations((prev) => {
            const existing = prev.find((c) => c.userId === otherUser);

            const updated: Conversation = {
              userId: otherUser,
              name:
                existing?.name ??
                friendsMapRef.current.get(otherUser) ??
                "Unknown",
              lastMessage: data.content,
              lastMessageAt: data.createdAt,
              unreadCount:
                data.receiverId === me.id
                  ? (existing?.unreadCount ?? 0) + 1
                  : (existing?.unreadCount ?? 0),
            };

            return [updated, ...prev.filter((c) => c.userId !== otherUser)];
          });
          break;
      }
    };

    return () => {
      ws.onmessage = null;
      ws.close();
      wsRef.current = null;
    };
  }, [me?.id]);

  // ---------------- SEND ----------------
  function sendMessage(receiverId: number, content: string) {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;

    ws.send(
      JSON.stringify({
        type: "chat",
        receiverId,
        content,
      }),
    );
  }

  // ---------------- MARK AS READ ----------------
  async function markAsRead(userId: number) {
    await fetch(`http://localhost:4243/message/read/${userId}`, {
      method: "POST",
      credentials: "include",
    });

    setConversations((prev) =>
      prev.map((c) => (c.userId === userId ? { ...c, unreadCount: 0 } : c)),
    );
  }

  // ---------------- CLOSE SOCKET AT LOGOUT ----------------
  function closeSocket() {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;

    ws.close();
    wsRef.current = null;
  }

  return (
    <ChatContext.Provider
      value={{
        me,
        friends,
        conversations,
        setConversations,
        sendMessage,
        markAsRead,
        closeSocket,
        lastMessage,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatProvider;
export { ChatContext };
