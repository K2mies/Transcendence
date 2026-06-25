import { Router } from "express";
import { getGamesController } from "../controllers/games.controller.js";

const router = Router();

router.get("/", getGamesController);

export default router;
