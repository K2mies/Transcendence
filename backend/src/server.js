import dotenv from "dotenv";
import {dirname, resolve} from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({path: resolve(__dirname, "../../.env")})

import app from "./app.js";
import {portCheck} from "./utils/portCheck.js";
import {shutdown} from "./utils/shutdown.js";
import {connectDB, disconnectDB} from "./config/db.js";

const isShuttingDown = {value: false};

const BACK_PORT = process.env.BACK_PORT;

let backPort;

try {
	backPort = portCheck(BACK_PORT);
} catch (error) {
	console.error(`${error}`);
	process.exit(1);
}

await connectDB();

// Open port that is defined in .env and the callback function to indicate that the PORT is listening
const server = app.listen(backPort, () => {
	console.log(`Server running on ${BACK_PORT}`);
});

process.on("SIGINT", () => shutdown("SIGINT", isShuttingDown, server));
process.on("SIGTERM", () => shutdown("SIGTERM", isShuttingDown, server));

// Handle unhandled promises rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
	console.error("Unhandled Rejection:", err);
	server.close(async () => {
		await disconnectDB();
		process.exit(1);
	});
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
	console.error("Uncaught Exception:", err);
	await disconnectDB();
	process.exit(1);
});