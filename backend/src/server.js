import "dotenv/config";
import app from "./app.js";

const rawPort = process.env.BACK_PORT;
const BACK_PORT = Number(rawPort);

if (!rawPort || Number.isNaN(BACK_PORT) || BACK_PORT < 1 || BACK_PORT > 65535)
	throw new Error("BACK_PORT must be valid port number (1-65535)");

// Open port that is defined in .env and the callbackfunction to indicate that the PORT is listening
const server = app.listen(BACK_PORT, () => {
	console.log(`Server running on ${BACK_PORT}`);
});

// Handle termination signals
let isShuttingDown = false;

function shutdown(signal) {
	if (isShuttingDown)
		return;
	isShuttingDown = true;
	console.log(`\nSignal [ ${signal} ] received. Shutting down...`);
	server.close(() => {
		console.log("Server closed.");
		process.exit(0);
	});

	// Force exit if still hanging
	setTimeout(() => {
		console.log("Forced shutdown (timeout)");
		process.exit(1);
	}, 5000);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
