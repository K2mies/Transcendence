import { prisma } from "../config/db.js";

export async function listReviews() {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      review: true,
      rating: true,
      createdAt: true,
      user: { select: { id: true, name: true } },
      game: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return reviews.map((r) => ({ ...r, game: r.game.name }));
}

export async function deleteReviewById(reviewId) {
  const review = await prisma.review.findUnique({ where: { id: reviewId } });

  if (!review) {
    const error = new Error("Review not found");
    error.status = 404;
    throw error;
  }

  await prisma.review.delete({ where: { id: reviewId } });
}
