import { useEffect, useRef, useState, useCallback } from "react";
import toast from "react-hot-toast";

import UserSearchBar from "./ChatSearchBar";
import ProfileSearchBar from "./ProfileSearchBar";
import UseChat from "./UseChat";
import { useNavigate } from "react-router-dom";

import ConversationList from "./ConversationList";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

import type { Friend, Message } from "../Types/ChatType";

export default function Chat() {
  const {
    me,
    conversations,
    setConversations,
    sendMessage,
    markAsRead,
    lastMessage,
    onlineUsers,
    activeChatUser,
    setActiveChatUser,
  } = UseChat();

  const selectedUserRef = useRef<number | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [text, setText] = useState("");
  const selectedConversation = conversations.find(
    (c) => c.userId === selectedUser,
  );

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.title = "Chat | GoodPlays";
  }, []);

  function scrollToBottom() {
    requestAnimationFrame(() => {
      messagesContainerRef.current?.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }

  // ---------------- OPEN PROFILE ----------------
  function openProfile(name: string) {
    navigate(`/user/${name}`);
  }

  // ---------------- OPEN CHAT ----------------
  const openChat = useCallback(
    async (userId: number) => {
      setSelectedUser(userId);
      setActiveChatUser(userId);
      selectedUserRef.current = userId;

      const res = await fetch(`/api/message/${userId}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        toast.custom(() => (
          <div className="rounded-lg bg-[#d32f2f] p-4 text-white">
            <div className="flex items-center gap-2">
              Failed to open chat. Please try again.
            </div>
          </div>
        ));
      }

      const data = await res.json();
      if (Array.isArray(data) && data.length === 0) {
        const friends = await fetch(`/api/user/friends`, {
          method: "GET",
          credentials: "include",
        });

        if (!friends.ok) {
          toast.custom(() => (
            <div className="rounded-lg bg-[#d32f2f] p-4 text-white">
              <div className="flex items-center gap-2">
                Failed to open chat. Please try again.
              </div>
            </div>
          ));
        }

        const friendsdata: Friend[] = await friends.json();

        const friend = friendsdata.find((friend) => friend.id === userId);

        setConversations((prev) => {
          if (!friend) return prev;
          const exists = prev.some((c) => c.userId === friend.id);

          if (exists) return prev;

          return [
            {
              userId: friend.id,
              name: friend.name,
              canChat: true,
            },
            ...prev,
          ];
        });
      }

      const newMessages = Array.isArray(data) ? data : [];

      setMessages(newMessages);

      await markAsRead(userId);

      scrollToBottom();
    },
    [markAsRead, setConversations, setActiveChatUser],
  );

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

    requestAnimationFrame(() => {
      const container = messagesContainerRef.current;
      if (!container) return;

      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        100;

      if (isNearBottom || activeChatUser === selectedUser) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }
    });
  }, [messages, selectedUser, activeChatUser]);

  useEffect(() => {
    if (!lastMessage || !selectedUser || !me) return;

    const belongsToCurrentChat =
      (lastMessage.senderId === selectedUser &&
        lastMessage.receiverId === me.id) ||
      (lastMessage.senderId === me.id &&
        lastMessage.receiverId === selectedUser);

    if (!belongsToCurrentChat) return;

    setMessages((prev) => {
      const messageAlreadyExists = prev.some(
        (message) => message.id === lastMessage.id,
      );

      if (messageAlreadyExists) {
        return prev;
      }

      requestAnimationFrame(scrollToBottom);

      return [...prev, lastMessage];
    });

    if (lastMessage.senderId === selectedUser) markAsRead(selectedUser);
  }, [lastMessage, selectedUser, me, markAsRead]);

  useEffect(() => {
    if (activeChatUser === null || activeChatUser === selectedUser) {
      return;
    }

    openChat(activeChatUser);
  }, [activeChatUser, selectedUser, openChat]);

  useEffect(() => {
    return () => {
      setActiveChatUser(null);
    };
  }, [setActiveChatUser]);

  return (
    <div className="h-screen bg-primary text-tertiary flex flex-col">
      {me ? (
        <div className="p-6">
          <div className="flex items-center justify-between">
            <UserSearchBar onSelectUser={openChat} />
            <ProfileSearchBar onSelectUser={openProfile} />
          </div>

          <div
            className="flex flex-1 min-h-0 overflow-hidden px-6 pb-6"
            style={{ height: "calc(100vh - 88px)" }}
          >
            {/* LEFT */}
            <ConversationList
              conversations={conversations}
              onlineUsers={onlineUsers}
              openChat={openChat}
            />
            {/* RIGHT */}
            <div className="ml-4 flex min-h-0 flex-1 flex-col">
              <div className="p-4 border-b border-secondary/20">
                <h2 className="text-secondary">
                  {selectedUser
                    ? `Chat with ${conversations.find((c) => c.userId === selectedUser)?.name || "User"}`
                    : "Select a chat"}
                </h2>
              </div>
              <MessageList
                me={me}
                messages={messages}
                messagesContainerRef={messagesContainerRef}
              />{" "}
              {selectedUser && (
                <MessageInput
                  text={text}
                  setText={setText}
                  send={send}
                  inputRef={inputRef}
                  canChat={selectedConversation?.canChat ?? true}
                />
              )}{" "}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-black p-6">
          Loading chat...
        </div>
      )}
    </div>
  );
}
