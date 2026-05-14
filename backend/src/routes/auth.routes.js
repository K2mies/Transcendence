import express from "express";
import {register, login, logout} from "../controllers/auth.controllers.js"
import {validateRequest} from "../middlewares/validateRequest.js";
import {registerToUserSchema, loginUserSchema} from "../validators/userValidators.js";

const router = express.Router();

router.post("/register", validateRequest(registerToUserSchema), register);
router.post("/login", validateRequest(loginUserSchema), login);
router.post("/logout", logout);

export default router;
