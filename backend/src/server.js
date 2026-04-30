import "dotenv/config";
import app from "./app.js";

const BACK_PORT = process.env.BACK_PORT

if (!BACK_PORT)
	throw new Error("BACK_PORT is not defined in .env!");

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
