import express from "express";
import {meUser, deleteUser} from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/me", meUser);
router.delete("/delete/me", deleteUser);

export default router;
