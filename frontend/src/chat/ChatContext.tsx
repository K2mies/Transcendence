import {
	createContext,
	useEffect,
	useRef,
	useState,
} from "react";

type Conversation = {
	userId: number;
	name: string;
	lastMessage?: string;
	lastMessageAt?: string;
	unreadCount?: number;
};

type ChatContextType = {
	me: any | null;
	conversations: Conversation[];
	setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
	sendMessage: (receiverId: number, content: string) => void;
	markAsRead: (userId: number) => Promise<void>;
	lastMessage: any;
};

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
	const wsRef = useRef<WebSocket | null>(null);

	const [me, setMe] = useState<any>(null);
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [lastMessage, setLastMessage] = useState<any>(null);

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

			const friendsMap = new Map(
				safeFriends.map((f: any) => [f.id, f.name])
			);
			const safeConv = Array.isArray(convData) ? convData : []; 

			setConversations(
				safeConv.map((c: any) => ({
					...c,
					name: friendsMap.get(c.userId) ?? "Unknown",
				}))
			);
		} catch (err) {
			console.error("Chat init failed:", err);
			setMe(null);
		}
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
	}, [])

	// ---------------- WEBSOCKET ----------------
	useEffect(() => {
		if (!me?.id)
			return;

		const ws = new WebSocket("ws://localhost:4243");
		wsRef.current = ws;

		ws.onmessage = (e) => {
			const data = JSON.parse(e.data);
			if (data.type !== "chat") return;

			setLastMessage(data);

			const otherUser =
				data.senderId === me.id ? data.receiverId : data.senderId;

			setConversations((prev) => {
				const existing = prev.find((c) => c.userId === otherUser);

				const updated: Conversation = {
					userId: otherUser,
					name: existing?.name ?? `User ${otherUser}`,
					lastMessage: data.content,
					lastMessageAt: data.createdAt,
					unreadCount:
						data.receiverId === me.id
						? (existing?.unreadCount ?? 0) + 1
						: existing?.unreadCount ?? 0,
				};

			return [
				updated,
				...prev.filter((c) => c.userId !== otherUser),
			];
			});
		};

		return () => {
			ws.onmessage = null;
			ws.close()
		};
	}, [me?.id]);

	// ---------------- SEND ----------------
	function sendMessage(receiverId: number, content: string) {
		wsRef.current?.send(
			JSON.stringify({
				type: "chat",
				receiverId,
				content,
			})
		);
		}

	// ---------------- MARK AS READ ----------------
	async function markAsRead(userId: number) {
		await fetch(`http://localhost:4243/message/read/${userId}`, {
			method: "POST",
			credentials: "include",
		});

		setConversations((prev) =>
			prev.map((c) =>
				c.userId === userId ? { ...c, unreadCount: 0 } : c
			)
		);
	}

	return (
		<ChatContext.Provider
			value={{
				me,
				conversations,
				setConversations,
				sendMessage,
				markAsRead,
				lastMessage,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
}

export default ChatContext;