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

			const existing = connectedUsers.get(user.id);
			if (existing && existing !== ws) {
				existing.close(1000, "Replaced by new connection");
			}
			connectedUsers.set(user.id, ws);

			console.log(`User ${user.name} (${user.id}) connected`);

			ws.send(JSON.stringify({
				type: "connected",
				userId: user.id,
			}));

			ws.on("message", async (message) => {
				try {
					const data = JSON.parse(message);

					console.log(`${user.name} connected via websocket`);
					if (data.type === "broadcast") {
						for (const [userId, receiverSocket] of connectedUsers) {
							if (userId !== user.id) {
								if (receiverSocket && receiverSocket.readyState === receiverSocket.OPEN) {
									receiverSocket.send(
										JSON.stringify({
											type: "broadcast",
											senderId: user.id,
											content: data.content,
										})
									);
								}
							}
						}
						return;
					}

					if (data.type !== "chat" || data.receiverId === user.id || !data.content?.trim())
						return;

					const msg = await prisma.message.create({
						data: {
							senderId: user.id,
							receiverId: data.receiverId,
							content: data.content,
						},
					});

					console.log("Message stored:", msg.id);

					const receiverSocket = connectedUsers.get(data.receiverId);

					if (receiverSocket && receiverSocket.readyState === receiverSocket.OPEN) {
						receiverSocket.send(
							JSON.stringify({
								type: "chat",
								id: msg.id,
								senderId: user.id,
								content: data.content,
								createdAt: msg.createdAt,
							})
						);
					}
				} catch (error) {
					console.error(error);
				}
			});

			ws.on("close", () => {
				console.log(`User ${user.id} disconnected`);
				if (connectedUsers.get(user.id) === ws) {
					connectedUsers.delete(user.id);
				}
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