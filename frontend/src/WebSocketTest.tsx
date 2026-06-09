import {useEffect} from "react";

export default function WebSocketTest() {
	useEffect(() => {
		const ws = new WebSocket("ws://localhost:4243");
		ws.onopen = () => {
			console.log("Connected");
		};

		ws.onmessage = (event) => {
			console.log("Received:", event.data);
		};

		ws.onclose = () => {
			console.log("Disconnected");
		};

		return () => {
			ws.close();
		};
	}, []);

	return <div>WS Test</div>;
}