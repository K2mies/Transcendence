import {WebSocketServer} from "ws";
import jwt from "jsonwebtoken";
import {prisma} from "../config/db.js";
import cookie from "cookie";

const connectedUsers = new Map();

export function setupWebSocket(server) {
	const wss = new WebSocketServer({server});

	console.log("WebSocket server initialized");

	wss.on("connection", async (ws, req) => {
		try {
			console.log("Incoming WS connection");

			const cookies = cookie.parse(req.headers.cookie || "");
			const token = cookies.jwt;
			if (!token) {
				console.log("No token provided");
				ws.close();
				return;
			}

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			const user = await prisma.user.findUnique({
				where: {
					id: decoded.id,
				},
				select: {
					id: true,
					name: true,
				},
			});

			if (!user) {
				console.log("User not found");
				ws.close();
				return;
			}

			ws.userId = user.id;
			connectedUsers.set(user.id, ws);

			console.log(`User ${user.name} (${user.id}) connected`);

			ws.send(JSON.stringify({
				type: "connected",
				userId: user.id,
			}));

			ws.on("message", (message) => {
				console.log(`Message from ${user.id}:`, message.toString());
			});

			ws.on("close", () => {
				console.log(`User ${user.id} disconnected`);
				connectedUsers.delete(user.id);
			});

			ws.on("error", (error) => {
				console.error(error);
			});
		} catch (error) {
			console.error("WS auth error:", error);
			ws.close();
		}
	});
	return wss;
}