import express from "express";
import {
  getGames,
  getGenres,
  getPlatforms,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/", getGames);
router.get("/genres", getGenres); //used to get genre list
router.get("/platforms", getPlatforms); //used to get platforms list

export default router;
