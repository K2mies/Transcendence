import { prisma } from "../config/db.js";

export const listReviews = async (req, res) => {
	const reviews = await prisma.review.findMany({
		select: {
			id: true,
			review: true,
			rating: true,
			createdAt: true,
			user: { select: { id: true, name: true } },
			game: { select: { id: true, name: true } },
		},
		orderBy: { createdAt: "desc" },
	});

	res.status(200).json({ status: "success", data: reviews });
};

export const deleteReviewById = async (req, res) => {
	const id = Number(req.params.id);

	const review = await prisma.review.findUnique({ where: { id } });

	if (!review) {
		return res.status(404).json({ error: "Review not found" });
	}

	await prisma.review.delete({ where: { id } });

	res.status(200).json({ status: "success", message: "Review deleted successfully" });
};
