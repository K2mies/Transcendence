import express from "express";
import {
  getMessages,
  getConversations,
  postRead,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/conversations", getConversations);
router.post("/read/:userId", postRead);
router.get("/:userId", getMessages);

export default router;
