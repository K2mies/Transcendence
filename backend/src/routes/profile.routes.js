import express from "express";
import * as profileController from "../controllers/profile.controller.js";
import { protect } from "../utils/protectJWT.js";
import { upload } from "../middlewares/uploadFiles.js"
import { updateBioSchema } from "../validators/userValidators.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.get("/:name", protect, profileController.getProfile)
router.post('/upload', protect, upload.single('file'), profileController.uploadImage)
router.post('/delete', protect, profileController.deleteImage)
router.post("/", protect, validateRequest(updateBioSchema), profileController.updateBio)

router.get("/:name/friend-status", protect, profileController.getFriendStatus)
router.post("/:name/friend-request", protect, profileController.addFriend)
router.put("/:name/accept-request", protect, profileController.acceptFriendRequest)
router.delete("/:name/decline-request", protect, profileController.declineFriendRequest)
router.delete("/:name/remove-friend", protect, profileController.removeFriend)

export default router;
