import express from "express";
import * as adminReviewController from "../controllers/adminReview.controller.js";

const router = express.Router();

router.get("/", adminReviewController.listReviews);
router.delete("/:id", adminReviewController.deleteReviewById);

export default router;
