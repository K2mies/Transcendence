export const healthCheck = async (req, res) => {
	try {
		// DB health check, replace later  with real, simulation atm
		const dbHealth = await Promise.resolve(true);
		if (!dbHealth) {
			return res.status(503).json({
				status: "ERROR",
				dependencies: {
					database: "DOWN"
				},
				timestamp: new Date().toISOString(),
				message: "Dependency failure"
			});
		}
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
		return res.status(500).json({
			status: "ERROR",
			timestamp: new Date().toISOString(),
			message: "Health check failed"
		});
	}
};