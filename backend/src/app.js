// We use ES modules (in package.json need to add "type": "module")
import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";

// Initialize express
const app = express();

// Parses incoming JSON -> puts it in req.body; limit is protection against huge payload
app.use(express.json({limit:"10kb"}));

/* Define security between frontend and backend in development stage.
 * cors allows only requests from port 4242, methods (GET, POST, PUT, DELETE).
 * Only allowd headers are "Content-Type" and "Authorization"
*/
const allowedOrigins = [
	"http://localhost:4242",
];

app.use(cors({
	origin: function (origin, callback) {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS!"));
		}
	},
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true
}));

// Routes
app.use("/api/v1", healthRoutes);

// 404 handler
app.use((req, res) => {
	res.status(404).json({error: "Route not found!"});
});

// Global error handler
app.use((err, req, res, next) => {
	console.log(err.stack);
	res.status(500).json({error:"Internal Server Error!"});
});

// Assigns app as default function other files can import
export default app;