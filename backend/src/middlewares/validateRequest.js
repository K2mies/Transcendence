export const validateRequest = (schema) => {
	return (req, res, next) => {
		const result = schema.safeParse(req.body);

		if (!result.success) {
			return res.status(400).json({
				message: "Data validation failed",
				errors: result.error.flatten().fieldErrors,
			});
		}

		// Passing on parsed data of the body, so next function can use that data!
		req.validBody = result.data;
		next();
	}
}