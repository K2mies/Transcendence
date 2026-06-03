import express from "express";
import passport from "passport";
import {register, login, logout, googleCallback} from "../controllers/auth.controllers.js";
import {validateRequest} from "../middlewares/validateRequest.js";
import {registerToUserSchema, loginUserSchema} from "../validators/userValidators.js";

const router = express.Router();

router.post("/register", validateRequest(registerToUserSchema), register);
router.post("/login", validateRequest(loginUserSchema), login);
router.post("/logout", logout);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["email", "profile"], session: true }));
router.get("/google/callback", (req, res, next) => {
	passport.authenticate("google", { session: true }, (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.status(401).json({ error: info?.message || "Authentication failed" });
		googleCallback(res, user);
	})(req, res, next);
});

export default router;
