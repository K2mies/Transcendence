import {disconnectDB} from "../config/db.js";

// Handle termination signals
export async function shutdown(signal, isShuttingDown, server) {
	if (isShuttingDown.value)
		return;
	isShuttingDown.value = true;
	console.log(`\nSignal [ ${signal} ] received. Shutting down...`);

	server.close( async () => {
		try {
			await disconnectDB();
			process.exit(0);
		} catch (error) {
			console.error("Shutdown error:", err);
			process.exit(1);
		}
	});
}
