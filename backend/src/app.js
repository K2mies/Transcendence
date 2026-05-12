import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import {protect} from "./utils/protectJWT.js";
import {corsValidator} from "./middlewares/validateCors.js";

// Initialize express
const app = express();

// Parses incoming JSON -> puts it in req.body; limit is protection against huge payload
app.use(express.json({limit:"10kb"}));
app.use(express.urlencoded({extended: true}));

app.use(corsValidator);

// Routes
app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/user", protect, userRoutes);

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