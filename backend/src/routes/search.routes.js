import express from "express";
import { getGames } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/", getGames);

export default router;
