import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { FaUserFriends } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";

import FriendRequestToast from "./FriendRequestToast";
import { FRIEND_ICON_SIZE } from "./NotificationConstants";
import NotificationUserLink from "./NotificationUserLink";

import type {
  Me,
  Conversation,
  ChatSocketMessage,
  SocketMessage,
  Friend,
} from "../Types/ChatType";

type ChatContextType = {
  me: Me | null;
  friends: Map<number, string>;
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  sendMessage: (receiverId: number, content: string) => void;
  markAsRead: (userId: number) => Promise<void>;
  closeSocket: () => void;
  lastMessage: ChatSocketMessage | null;
  onlineUsers: Set<number>;
  activeChatUser: number | null;
  setActiveChatUser: React.Dispatch<React.SetStateAction<number | null>>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const wsRef = useRef<WebSocket | null>(null);
  const friendsMapRef = useRef<Map<number, string>>(new Map());
  const activeChatUserRef = useRef<number | null>(null);

  const [me, setMe] = useState<Me | null>(null);
  const [friends, setFriends] = useState<Map<number, string>>(new Map());
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [lastMessage, setLastMessage] = useState<ChatSocketMessage | null>(
    null,
  );
  const [onlineUsers, setOnlineUsers] = useState(new Set<number>());
  const [activeChatUser, setActiveChatUser] = useState<number | null>(null);

  useEffect(() => {
    activeChatUserRef.current = activeChatUser;
  }, [activeChatUser]);

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

      const safeFriends: Friend[] = Array.isArray(friendsData)
        ? friendsData
        : [];

      const friendsMap = new Map<number, string>(
        safeFriends.map((friend) => [friend.id, friend.name]),
      );

      setFriends(friendsMap);
      friendsMapRef.current = friendsMap;

      const safeConv = Array.isArray(convData) ? convData : [];

      setConversations(safeConv);
    } catch {
      setMe(null);
    }
  }

  // ---------------- GET MY FRIENDS ----------------
  async function getFriends() {
    const friendsRes = await fetch("http://localhost:4243/user/friends", {
      credentials: "include",
    });

    if (!friendsRes.ok) {
      console.error("Error refreshing friends");
      return;
    }

    const friendsData: Friend[] = await friendsRes.json();

    const friendsMap = new Map<number, string>(
      friendsData.map((friend) => [friend.id, friend.name]),
    );

    setFriends(friendsMap);
    friendsMapRef.current = friendsMap;

    window.dispatchEvent(new Event("friend-status-changed"));
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
      let data: SocketMessage;

      try {
        data = JSON.parse(e.data) as SocketMessage;
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
            <FriendRequestToast toastId={t.id} senderName={data.senderName} />
          ));

          window.dispatchEvent(new Event("friend-status-changed"));
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

          setConversations((previousConversations) =>
            previousConversations.map((conversation) =>
              conversation.userId === data.userId
                ? {
                    ...conversation,
                    canChat: true,
                  }
                : conversation,
            ),
          );
          window.dispatchEvent(new Event("friend-status-changed"));
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
          window.dispatchEvent(new Event("friend-status-changed"));
          break;

        case "username-changed":
          setFriends((previousFriends) => {
            const updatedFriends = new Map(previousFriends);

            if (updatedFriends.has(data.userId)) {
              updatedFriends.set(data.userId, data.newName);
            }

            friendsMapRef.current = updatedFriends;
            return updatedFriends;
          });

          setConversations((previousConversations) =>
            previousConversations.map((conversation) =>
              conversation.userId === data.userId
                ? {
                    ...conversation,
                    name: data.newName,
                  }
                : conversation,
            ),
          );

          break;

        case "friend-removed":
          getFriends();

          setConversations((previousConversations) =>
            previousConversations.map((conversation) =>
              conversation.userId === data.userId
                ? {
                    ...conversation,
                    canChat: false,
                  }
                : conversation,
            ),
          );

          break;

        case "chat": {
          setLastMessage(data);
          if (
            data.senderId !== me.id &&
            data.senderId !== activeChatUserRef.current
          ) {
            const senderName =
              friendsMapRef.current.get(data.senderId) ?? "Someone";

            toast.custom((t) => (
              <button
                type="button"
                className="rounded-lg bg-primary p-4 text-tertiary max-w-sm cursor-pointer text-left"
                onClick={() => {
                  setActiveChatUser(data.senderId);
                  navigate("/chat");
                  toast.dismiss(t.id);
                }}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <IoChatbubbleEllipses
                      size={16}
                      className="shrink-0 text-secondary"
                    />

                    <span className="shrink-0 font-bold text-secondary">
                      {senderName}
                    </span>

                    <span className="text-xs italic">sent you a message</span>
                  </div>

                  <div className="mt-1 min-w-0 truncate text-sm opacity-80">
                    "{data.content}"
                  </div>
                </div>
              </button>
            ));
          }

          const otherUser =
            data.senderId === me.id ? data.receiverId : data.senderId;

          setConversations((prev) => {
            const existing = prev.find((c) => c.userId === otherUser);

            const updated: Conversation = {
              userId: otherUser,
              name:
                existing?.name ??
                data.senderName ??
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
      }
    };

    return () => {
      ws.onmessage = null;
      ws.close();
      wsRef.current = null;
    };
  }, [me?.id, navigate]);

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
  const markAsRead = useCallback(async (userId: number) => {
    await fetch(`http://localhost:4243/message/read/${userId}`, {
      method: "POST",
      credentials: "include",
    });

    setConversations((prev) => {
      const conversation = prev.find((c) => c.userId === userId);

      if (!conversation || (conversation.unreadCount ?? 0) === 0) {
        return prev;
      }

      return prev.map((c) =>
        c.userId === userId ? { ...c, unreadCount: 0 } : c,
      );
    });
  }, []);

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
        activeChatUser,
        setActiveChatUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatProvider;
export { ChatContext };
