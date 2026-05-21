import express from "express";
import * as profileController from "../controllers/profile.controller.js"
import {protect} from "../utils/protectJWT.js";

const router = express.Router();

router.get("/:name", profileController.getProfile)
router.put("/:name", protect, profileController.updateProfile)

export default router;
