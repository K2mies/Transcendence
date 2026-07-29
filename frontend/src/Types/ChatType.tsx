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
  canChat: boolean;
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

export type ChatSocketMessage = Message & {
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
      userId: number;
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
  | {
      type: "friend-removed";
      userId: number;
    }
  | ChatSocketMessage;
