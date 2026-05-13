import * as profileService from "../services/profile.service.js" //here we import the entire file because this file might contain multiple functions

export async function getProfile(req, res)
{
	const userId = Number(req.params.id)
	const profile = await profileService.getProfile(userId)
	console.log(profile)
	res.json(profile)
}

export async function updateProfile(req, res)
{
	const userId = Number(req.params.id)
	// if (userId != req.user.id) { //This is commented out for now but we need this as the user can only update their own profile
	// 	res.status(403).json({ "Request forbidden" })
	// }
	const newData = req.body
	try {
		const profile = await profileService.updateProfile(userId, newData)
		console.log(profile)
		res.json(profile)
	} catch (error) {
		res.status(409).json({ error })		
	}
}
