import * as homeService from "../services/home.service.js"

export async function getHomeController(req, res) {
    try {
        const profile = await homeService.getHome();
        res.status(200).json(profile);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" })
    }
}