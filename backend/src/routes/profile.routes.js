import express from "express";
import * as profileController from "../controllers/profile.controller.js";
import { protect } from "../utils/protectJWT.js";
import { upload } from "../middlewares/uploadFiles.js"

const router = express.Router();

router.get("/:name", protect, profileController.getProfile)
router.post("/", protect, profileController.updateProfile)
router.post('/upload', upload.single('file'), (req, res) => { //obv we cant do it this way
	res.send('File uploaded successfully.');
});

router.get("/:name/friend-status", protect, profileController.getFriendStatus)
router.post("/:name/friend-request", protect, profileController.addFriend)
router.put("/:name/accept-request", protect, profileController.acceptFriendRequest)
router.delete("/:name/decline-request", protect, profileController.declineFriendRequest)
router.delete("/:name/remove-friend", protect, profileController.removeFriend)

export default router;
