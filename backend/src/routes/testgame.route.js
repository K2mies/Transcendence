import {PrismaClient} from "@prisma/client";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
	const rating = Number(req.query.rating);
	try {
		const prisma = new PrismaClient();
		const response = await prisma.game.findMany({
			where: { rating: rating, },
		});
		if (!response)
			res.status(404).error("NOT FOUND!");
		else
			res.json(response);
	} catch (error) {
		res.status(404);
		console.error(error);
	}
});

export default router;
