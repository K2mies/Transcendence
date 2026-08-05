import * as healthService from "../services/health.service.js";

export const healthCheck = async (req, res) => {
	try {
		await healthService.checkDB();

		return res.status(200).json({
			status: "OK",
			uptime: process.uptime(),
			dependencies: {
				database: "UP"
			},
			timestamp: new Date().toISOString(),
			message: "Server is running"
		});
	} catch (error) {
		console.error("Health check failed:", error);
		return res.status(503).json({
			status: "ERROR",
			dependencies: {
				database: "DOWN",
			},
			timestamp: new Date().toISOString(),
			message: "Health check failed"
		});
	}
};