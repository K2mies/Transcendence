import {disconnectDB} from "../config/db.js";

// Handle termination signals
export function shutdown(signal, isShuttingDown, server) {
	if (isShuttingDown)
		return;
	isShuttingDown = true;
	console.log(`\nSignal [ ${signal} ] received. Shutting down...`);
	server.close(() => {
		console.log("Server closed.");
		disconnectDB();
		process.exit(0);
	});

	// Force exit if still hanging
	setTimeout(() => {
		console.log("Forced shutdown (timeout)");
		process.exit(1);
	}, 5000);
}
