import cors from "cors";

/*
 * CORS (Cross-Origin Resource Sharing)
 *
 * Only requests originating from the HTTPS frontend served through the
 * nginx reverse proxy (https://localhost) are allowed.
 *
 * Allowed HTTP methods:
 *    GET, POST, PUT, PATCH and DELETE.
 *
 * Allowed request headers:
 *    Content-Type and Authorization.
 *
 * Credentials (cookies) are enabled so authenticated requests can be
 * sent from the frontend to the backend.
 */
const allowedOrigins = [
  "https://localhost",
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
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

export { corsValidator };
