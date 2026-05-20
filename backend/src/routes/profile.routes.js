import express from "express";
import * as profileController from "../controllers/profile.controller.js"
console.log(profileController)

const router = express.Router();

router.get("/:name", profileController.getProfile)
router.put("/:name", profileController.updateProfile)

export default router;
