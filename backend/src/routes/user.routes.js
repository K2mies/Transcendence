import express from "express";
import {protect} from "../utils/protectJWT.js";
import {deleteUser} from "../controllers/user.controllers.js";

const router = express.Router();

router.delete("/delete/me", protect, deleteUser);

export default router;
