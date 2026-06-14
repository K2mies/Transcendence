import express from "express";
import {getMessages, getConversations} from "../controllers/message.controllers.js";

const router = express.Router();

router.get("/conversations", getConversations);
router.get("/:userId", getMessages);

export default router;