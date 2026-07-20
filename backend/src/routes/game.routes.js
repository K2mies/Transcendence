import express from "express";
import { protect } from "../utils/protectJWT.js";
import * as gameController from "../controllers/game.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { updateReviewSchema } from "../validators/userValidators.js";

const router = express.Router();

router.get("/:name", protect, gameController.getGame);
router.post(
  "/:name/update-game-relation",
  protect,
  gameController.updateGameRelation,
);
router.post(
  "/:name/add-review",
  protect,
  validateRequest(updateReviewSchema),
  gameController.addReview,
);
router.delete("/:name/delete-review", protect, gameController.deleteReview);

export default router;
