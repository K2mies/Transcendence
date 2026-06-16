import {useEffect, useRef} from "react";

export default function WebSocketTest() {
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

	return <div>WS Test</div>;
}