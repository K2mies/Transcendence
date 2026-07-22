export type Me = {
  id: number;
  name: string;
};

export type Friend = {
  id: number;
  name: string;
};

export type Conversation = {
  userId: number;
  name: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount?: number;
};

type BaseMessage = {
  senderId: number;
  receiverId: number;
  senderName: string;
  content: string;
  createdAt: string;
};

export type Message = BaseMessage & {
  id: number;
  read?: boolean;
};

export type ChatSocketMessage = BaseMessage & {
  type: "chat";
};

export type SocketMessage =
  | {
      type: "online-users";
      users: number[];
    }
  | {
      type: "user-online";
      userId: number;
    }
  | {
      type: "user-offline";
      userId: number;
    }
  | {
      type: "friend-request";
      senderId: number;
      senderName: string;
    }
  | {
      type: "friend-request-accepted";
      accepterName: string;
    }
  | {
      type: "friend-request-declined";
      declinerName: string;
    }
  | {
      type: "username-changed";
      userId: number;
      newName: string;
    }
  | ChatSocketMessage;
