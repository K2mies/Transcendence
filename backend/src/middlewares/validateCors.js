import cors from "cors";

/*
 * CORS (Cross-Origin Resource Sharing)
 * cors allows only requests from port 8080 (frontend) and 4242(backend in development),
 * allowed methods: GET, POST, PUT, DELETE.
 * Only allowed headers are "Content-Type" and "Authorization"
*/
const allowedOrigins = [
	"http://localhost:5173",
	"http://localhost:4243",
	"http://127.0.0.1:5173"
];

/*
 * This section configures the CORS middleware, which controls which browser origins are allowed to access the backend API.
 * When a request includes an Origin header, the middleware checks whether it is in the allowedOrigins list.
 * If the origin is valid, the request is allowed to proceed.
 * If not, an error is passed to the callback, which results in the request being rejected (typically with a 403 status via error handling).
 * This acts as a browser-enforced access control layer, preventing unauthorized websites from reading API responses.
*/

const corsValidator = cors({
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
})

export {corsValidator};
