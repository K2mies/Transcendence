import * as profileService from "../services/profile.service.js" //here we import the entire file because this file might contain multiple functions

export async function getProfile(req, res)
{
	const userId = Number(req.params.id)
	const profile = await profileService.getProfile(userId)
	console.log(profile)
	res.json(profile)
}
