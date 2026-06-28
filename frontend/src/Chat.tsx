import { useEffect, useRef, useState } from "react";
import UserSearchBar from "./ChatSearchBar";
import UseChat from "./chat/UseChat";

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

		await markAsRead(userId);

		requestAnimationFrame(() => {
			const container = messagesContainerRef.current;
			if (!container)
				return;

			container.scrollTop = container.scrollHeight;
		});
	}

	function send() {
		if (!selectedUser || !text.trim()) return;

		sendMessage(selectedUser, text);

		setText("");
	}

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

	useEffect(() => {
		if (!lastMessage || !selectedUser)
			return;

		const belongsToCurrentChat =
			(lastMessage.senderId === selectedUser &&
				lastMessage.receiverId === me.id) ||
			(lastMessage.senderId === me.id &&
				lastMessage.receiverId === selectedUser);

		if (!belongsToCurrentChat)
			return;

		setMessages(prev => [...prev, lastMessage]);

		if (lastMessage.senderId === selectedUser)
			markAsRead(selectedUser);
	}, [lastMessage, selectedUser, me]);


	
	if (!me) {
		return <div className="text-black p-6">Loading chat...</div>;
	}

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
								<div className="flex items-center gap-2 font-bold text-secondary">
									<span>{c.name}</span>

									{onlineUsers.has(c.userId) && (
										<span className="h-2.5 w-2.5 rounded-full bg-[var(--color-online)]" />
									)}
								</div>

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
								value={text}
								maxLength={120}
								onChange={(e) => setText(e.target.value)}
								placeholder="Type a message..."
								className="flex-1 p-2 rounded bg-primary/40 outline-none"
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
	</div>;
}