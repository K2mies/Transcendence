import * as profileService from "../services/profile.service.js" //here we import the entire file because this file might contain multiple functions

export async function getProfile(req, res)
{
	const userId = 1 //we put it for one for now, but we should be getting this info elsewhere
	const profile = await profileService.getProfile(userId)
	console.log(profile)
	res.json(profile)
}
