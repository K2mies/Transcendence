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
			console.log("Received:", JSON.parse(event.data));
		};

		ws.onclose = () => {
			console.log("Disconnected");
		};

		return () => ws.close();
	}, []);

	return <div>WS Test</div>;
}