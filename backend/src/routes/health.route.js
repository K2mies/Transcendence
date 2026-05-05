import express from "express";
import {healthCheck} from "../controllers/health.controller.js";

// Creating Router instance
const router = express.Router();

/* Defining a route [router.get: handles HTTP GET request; "/": path;
 * healthCheck: callback function when this route is requested]
*/
router.get("/", healthCheck);

export default router;