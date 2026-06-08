import express from "express";
import {protect} from "../utils/protectJWT.js";
import * as gameController from "../controllers/game.controller.js"

const router = express.Router();

router.get("/:name", protect, gameController.getGame)

export default router;
