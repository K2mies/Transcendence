import express from "express";
import session from "express-session";
import profileRoutes from "./routes/profile.routes.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./config/passport.js";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import gameRoutes from "./routes/game.routes.js";
import {protect} from "./utils/protectJWT.js";
import {corsValidator} from "./middlewares/validateCors.js";

// Initialize express
const app = express();

// Parses incoming JSON -> puts it in req.body; limit is protection against huge payload
app.use(express.json({limit:"10kb"}));
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use(corsValidator);
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: { secure: process.env.NODE_ENV === "production", maxAge: 5 * 60 * 1000 }, // 5 minutes — only needed for OAuth flow
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/user", protect, userRoutes);
app.use("/profile", profileRoutes);
app.use("/game", gameRoutes);

// 404 handler
app.use((req, res) => {
	res.status(404).json({error: "Route not found!"});
});

// Global error handler
app.use((err, req, res, next) => {
	let errCode = err.status || err.statusCode;

	if (!errCode) {
		switch (err.type) {
			case "CORS":
				errCode = 403;
				break;
			case "VALIDATION":
				errCode = 400;
				break;
			case "AUTH":
				errCode = 401;
				break;
			default:
				errCode = 500;
		}
	}
	console.error(err);

	res.status(errCode).json({
		error: err.message || "Internal Server Error!"
	});
});

// Assigns app as default function other files can import
export default app;
