import { useEffect, useRef, useState } from "react";
import UserSearchBar from "./ChatSearchBar";

export default function Chat() {
	const wsRef = useRef<WebSocket | null>(null);

	const selectedUserRef = useRef<number | null>(null);

	const [conversations, setConversations] = useState<any[]>([]);
	const [messages, setMessages] = useState<any[]>([]);
	const [selectedUser, setSelectedUser] = useState<number | null>(null);
	const [text, setText] = useState("");
	const [me, setMe] = useState<{ id: number } | null>(null);
	const messagesContainerRef = useRef<HTMLDivElement | null>(null);

	// ---------------- OPEN CHAT ----------------
	async function openChat(userId: number) {
		setSelectedUser(userId);
		selectedUserRef.current = userId;

		const res = await fetch(`http://localhost:4243/message/${userId}`, {
			method: "GET",
			credentials: "include",
		});

		const data = await res.json();
		if (data.length === 0) {
			const friends = await fetch(`http://localhost:4243/user/friends`, {
				method: "GET",
				credentials: "include",
			});

			const friendsdata = await friends.json();
			const friend = friendsdata.find(
				(friend: any) => friend.id === userId
			);
			setConversations(prev => {
				const exists = prev.some(c => c.userId === friend.id);

				if (exists)
					return prev;

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

		// ---------------- UPDATE IN DATABASE ----------------
		await fetch(`http://localhost:4243/message/read/${userId}`, {
			method: "POST",
			credentials: "include",
			
		});

		setConversations(prev =>
			prev.map(c =>
				c.userId === userId
					? { ...c, unreadCount: 0 }
					: c
			)
		);
	}

	function sendMessage() {
		if (!wsRef.current || !selectedUser || !text.trim()) return;

		wsRef.current.send(
			JSON.stringify({
				type: "chat",
				receiverId: selectedUser,
				content: text.slice(0, 120),
			})
		);

		setText("");
	}

	// ---------------- LOAD ME ----------------
	useEffect(() => {
		async function loadMe() {
			const res = await fetch("http://localhost:4243/user/me", {
				method: "GET",
				credentials: "include",
			});

			const data = await res.json();
			setMe(data.user);
		}

		loadMe();
	}, []);

	// ---------------- LOAD CONVERSATIONS ----------------
	useEffect(() => {
		async function getConversations() {
			try {
				const response = await fetch(
					`http://localhost:4243/message/conversations`,
					{
						method: "GET",
						credentials: "include",
					}
				);

				const res = await response.json();

				setConversations(Array.isArray(res) ? res : []);
			} catch (err) {
				console.error("Failed to load conversations", err);
				setConversations([]);
			}
		}

		getConversations();
	}, []);

	// ---------------- MESSAGES AUTO-SCROLL ----------------
	useEffect(() => {
		const container = messagesContainerRef.current;
		if (!container) return;

		const isNearBottom =
			container.scrollHeight - container.scrollTop - container.clientHeight < 100;

		if (isNearBottom) {
			container.scrollTo({
				top: container.scrollHeight,
				behavior: "auto",
			});
		}
	}, [messages]);

	// ---------------- WEBSOCKET ----------------
	useEffect(() => {
		if (!me)
			return;
		const ws = new WebSocket("ws://localhost:4243");
		wsRef.current = ws;

		ws.onopen = () => {
			console.log("Connected");
		};

		ws.onmessage = (event) => {
			let data;

			try {
				data = JSON.parse(event.data);
			} catch {
				console.error("Invalid message:", event.data);
				return;
			}

			if (data.type !== "chat") return;

			const myId = me.id;
			const activeUser = selectedUserRef.current;

			const otherUserId =
				data.senderId === myId ? data.receiverId : data.senderId;

			const isCurrentChat =
				activeUser !== null &&
				((data.senderId === activeUser && data.receiverId === myId) ||
					(data.senderId === myId && data.receiverId === activeUser));

			if (isCurrentChat) {
				setMessages(prev => [...prev, data]);
			}

			setConversations(prev => {
				const existing = prev.find(c => c.userId === otherUserId);
				const isFromOpenChat =
					selectedUserRef.current === otherUserId;

				const isIncoming = data.receiverId === myId;
				let unreadCount = existing?.unreadCount ?? 0;
				if (isIncoming) {
					if (isFromOpenChat) {
						unreadCount = 0;
					} else {
						unreadCount++;
					}
				}

				const updatedConversation = {
					userId: otherUserId,
					name: existing?.name ?? "Unknown",
					lastMessage: data.content,
					lastMessageAt: data.createdAt,
					unreadCount: unreadCount,
				};

				const without = prev.filter(
					c => c.userId !== otherUserId
				);

				return [updatedConversation, ...without];
			});
		};
	}, [me]);

	return <div className="relative min-h-screen overflow-hidden bg-primary">
		{/* Golden sunrise */}
		<div
			className="
				absolute
				-left-40
				-top-40
				h-[40rem]
				w-[40rem]
				rounded-full
				bg-secondary/90
				animate-drift
			"
		/>

		{/* Main energy source */}
		<div
			className="
				absolute
				right-[-10rem]
				bottom-[-10rem]
				h-[35rem]
				w-[35rem]
				rounded-full
				bg-secondary/80
				animate-drift-reverse
			"
		/>

		{/* Central glow */}
		<div
			className="
				absolute
				left-1/2
				top-1/2
				h-[28rem]
				w-[28rem]
				-translate-x-1/2
				-translate-y-1/2
				rounded-full
				bg-secondary/50
				animate-drift-slow
			"
		/>

		{/* Subtle radial light */}
		<div
			className="
				absolute
				inset-0
				bg-[radial-gradient(circle_at_center,rgba(197,145,19,0.15),transparent_70%,var(--intensity))]
			"
		/>

		<div className="relative z-10 p-6 text-tertiary">
			<UserSearchBar onSelectUser={openChat} />

			<div className="flex h-screen">
				{/* LEFT */}
				<div className="w-80 border-r border-secondary/20 overflow-y-auto p-4">
					<h2 className="mb-4 text-lg text-secondary">
						Conversations
					</h2>

					{conversations.map((c) => (
						<div
							key={c.userId}
							onClick={() => openChat(c.userId)}
							className="p-3 mb-2 rounded-xl bg-primary/40 cursor-pointer hover:bg-primary/60"
						>
							<div className="flex justify-between">
								<div className="font-bold text-secondary">{c.name}</div>

								{c.unreadCount > 0 && (
									<span className="text-xs bg-secondary text-primary px-2 rounded-full">
										{c.unreadCount}
									</span>
								)}
							</div>

							<div className="text-sm opacity-70 truncate">
								{c.lastMessage}
							</div>

							<div className="text-xs opacity-50">
								{c.lastMessageAt
									? new Date(c.lastMessageAt).toLocaleTimeString()
									: ""}
							</div>
						</div>
					))}
				</div>

				{/* RIGHT */}
				<div className="flex flex-col flex-1">
					<div className="p-4 border-b border-secondary/20">
						<h2 className="text-secondary">
							{selectedUser
								? `Chat with ${conversations.find(c => c.userId === selectedUser)?.name || "User"}`
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
								<div className="whitespace-pre-wrap break-words max-w-xs p-3 rounded-xl">{msg.content}</div>
								<div className="text-xs opacity-60">
									{msg.createdAt
										? new Date(
												msg.createdAt
											).toLocaleTimeString()
										: ""}
								</div>
							</div>
						))}
					</div>
					{selectedUser && (
						<div className="p-4 border-t border-secondary/20 flex gap-2">
							<input
								value={text}
								maxLength={120}
								onChange={(e) => setText(e.target.value)}
								placeholder="Type a message..."
								className="flex-1 p-2 rounded bg-primary/40 outline-none"
							/>

							<button
								onClick={sendMessage}
								className="px-4 py-2 bg-secondary text-primary rounded"
							>
								Send
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	</div>;
}