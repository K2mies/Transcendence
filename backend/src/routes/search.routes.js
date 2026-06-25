import express from "express";
import {
  getGames,
  getGenres,
  getPlatforms,
  getDevelopers,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/", getGames);
router.get("/genres", getGenres); //used to get genre list
router.get("/platforms", getPlatforms); //used to get platforms list
router.get("/developers", getDevelopers); //used to get the developers list

export default router;
