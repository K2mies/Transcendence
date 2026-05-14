import express from "express";
import * as profileController from "../controllers/profile.controller.js" //again we import the entire file as it may contain multiple functions
console.log(profileController)
// Creating Router instance
const router = express.Router();

router.get("/:id", profileController.getProfile)
router.put("/:id", profileController.updateProfile)
router.put("/:id/friend", profileController.addFriend)

export default router;
