import express from "express";
import passport from "passport";
import {register, login, logout, googleCallback, getMe, updateUsername} from "../controllers/auth.controllers.js";
import { protect } from "../utils/protectJWT.js";
import {validateRequest} from "../middlewares/validateRequest.js";
import {registerToUserSchema, loginUserSchema, updateUsernameSchema} from "../validators/userValidators.js";

const router = express.Router();

router.post("/register", validateRequest(registerToUserSchema), register);
router.post("/login", validateRequest(loginUserSchema), login);
router.post("/logout", logout);
router.get("/me", protect, getMe);
router.patch("/username", protect, validateRequest(updateUsernameSchema), updateUsername);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["email", "profile"], session: true }));
router.get("/google/callback", (req, res, next) => {
	passport.authenticate("google", { session: true }, (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.redirect(`${process.env.FRONTEND_URL ?? "http://localhost:5173"}/oauth/callback?error=${encodeURIComponent(info?.message || "Authentication failed")}`);
		googleCallback(res, user);
	})(req, res, next);
});

export default router;
