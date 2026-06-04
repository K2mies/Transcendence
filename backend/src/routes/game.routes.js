import express from "express";
import * as gameController from "../controllers/game.controller.js";

const router = express.Router();

router.get("/:name", gameController.getGame);

export default router;
