import express from "express";
import * as profileController from "../controllers/profile.controller.js"

const router = express.Router();

router.get("/:name", profileController.getProfile)
router.put("/:name", profileController.updateProfile)

export default router;
