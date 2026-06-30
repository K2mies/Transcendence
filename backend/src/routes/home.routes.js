import { Router } from "express";
import { getHomeController } from "../controllers/home.controller.js";

const router = Router();

router.get("/", getHomeController);

export default router;