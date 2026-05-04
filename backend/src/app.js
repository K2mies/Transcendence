// We use ES modules (in package.json need to add "type": "module")
import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.route.js";

// Initialize express
const app = express();

// Parses incoming JSON -> puts it in req.body; limit is protection against huge payload
app.use(express.json({limit:"10kb"}));

/* Define security between frontend and backend in development stage.
 * CORS (Cross-Origin Resource Sharing)
 * cors allows only requests from port 8080 (frontend),
 * allowed methods: GET, POST, PUT, DELETE.
 * Only allowed headers are "Content-Type" and "Authorization"
*/
const allowedOrigins = [
	"http://localhost:8080"
];

/* This section configures the CORS middleware, which controls which browser origins are allowed to access the backend API.
 * When a request includes an Origin header, the middleware checks whether it is in the allowedOrigins list.
 * If the origin is valid, the request is allowed to proceed.
 * If not, an error is passed to the callback, which results in the request being rejected (typically with a 403 status via error handling).
 * This acts as a browser-enforced access control layer, preventing unauthorized websites from reading API responses.
*/

app.use(cors({
	origin: function (origin, callback) {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			const err = new Error("Not allowed by CORS");
			err.type = "CORS";
			err.statusCode = 403;
			callback(err);
		}
	},
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true
}));

// Routes
app.use("/api/v1/health", healthRoutes);

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