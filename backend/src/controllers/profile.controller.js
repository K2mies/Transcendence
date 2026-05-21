import * as profileService from "../services/profile.service.js"

export async function getProfile(req, res)
{
	const userName = req.params.name
	try {
		const profile = await profileService.getProfile(userName)
		if (!profile)
			return res.status(404).json({ error: "User not found" });
		res.status(200).json(profile);
	} catch (error) {
		return res.status(500).json({ error: "Internal server error" });
	}
}

export async function updateProfile(req, res)
{
	const userName = req.params.name
	const newData = req.body
	try {
		const profile = await profileService.updateProfile(userName, newData)
		if (!profile)
			return res.status(404).json({ error: "User not found" });
		res.status(200).json(profile);
	} catch (error) {
		res.status(409).json({ error })
	}
}
