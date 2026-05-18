import {PrismaClient} from "@prisma/client";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
	const username = req.query.name;
	try {
		const prisma = new PrismaClient();
		const response = await prisma.user.findUnique({
			where: { name: username, },
			include: {
				userGames: {
					include: {
						game: true,
					},
				},
			}
		});
		if (!response)
			res.status(404).error("NOT FOUND!");
		else
			await res.json(response);
	} catch (error) {
		res.status(404);
		console.error(error);
	}
});

export default router;
