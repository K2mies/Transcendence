import * as profileService from "../services/profile.service.js"

export async function getProfile(req, res)
{
	const userName = req.params.name
	const profile = await profileService.getProfile(userName)
	console.log(profile)
	res.json(profile)
}

export async function updateProfile(req, res)
{
	const userName = req.params.name
	// if (userName != req.user.name) { //This is commented out for now but we need this as the user can only update their own profile
	// 	return res.status(403).json({ "Request forbidden" })
	// }
	const newData = req.body
	try {
		const profile = await profileService.updateProfile(userName, newData)
		if (!profile)
			res.status(404).json({ error: "User not found" });		
		else
			res.status(200).json(profile);
	} catch (error) {
		res.status(409).json({ error })		
	}
}
