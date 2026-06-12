import express from "express";
import { getGames, getGenres } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/", getGames);
router.get("/genres", getGenres); //temp delete used to get genre list

export default router;
