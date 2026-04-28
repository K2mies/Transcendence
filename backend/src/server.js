import "dotenv/config";
import app from "./app.js";

const PORT = process.env.BACK_PORT

if (!PORT)
	throw new Error("PORT is not defined in .env!");

// Open port that is defined in .env and the callbackfunction to indicate that the PORT is listening
const server = app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
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
