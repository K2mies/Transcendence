import { Router } from "express";
import { protect } from "../utils/protectJWT.js";
import { getDashboardController } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/", protect, getDashboardController);

export default router;

