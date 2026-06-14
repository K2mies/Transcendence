import {useEffect, useRef} from "react";

export default function Chat() {
	const wsRef = useRef<WebSocket | null>(null);

	useEffect(() => {
		const ws = new WebSocket("ws://localhost:4243");

		wsRef.current = ws;

		ws.onopen = () => {
			console.log("Connected");

			ws.send(
				JSON.stringify({
					type: "broadcast",
					content: "Hello, a new user connected!",
				})
			);
		};

		ws.onmessage = (event) => {
			try {
				const data = JSON.parse(event.data);
				console.log("Received:", data);
			} catch (error) {
				console.error("Invalid message:", event.data);
			}
		};

		ws.onclose = () => {
			console.log("Disconnected");
		};

		ws.onerror = (err) => {
			console.error("WebSocket error:", err);
		}

		return () => ws.close();
	}, []);

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
			<h1 className="text-4xl font-bold text-secondary">
				Chat
			</h1>
		</div>
	</div>;
}