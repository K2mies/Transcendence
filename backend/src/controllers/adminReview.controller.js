import * as adminReviewService from "../services/adminReview.service.js";

export const listReviews = async (req, res) => {
  try {
    const reviews = await adminReviewService.listReviews();
    res.status(200).json({ status: "success", data: reviews });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const deleteReviewById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    await adminReviewService.deleteReviewById(id);
    res
      .status(200)
      .json({ status: "success", message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
