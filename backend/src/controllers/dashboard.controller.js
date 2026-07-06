import * as dashboardService from "../services/dashboard.service.js"

export async function getDashboardController(req, res) {
	try {
		const profile = await dashboardService.getDashboard();
		res.status(200).json(profile);
	} catch (error) {
		res.status(error.status || 500).json({ message: error.message || "Internal server error" })
	}
}