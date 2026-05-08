import {prisma} from "../config/db.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
	try{
		let token;

		// 1. check Authorization header
		if (req.headers.authorization?.startsWith("Bearer ")) {
			token = req.headers.authorization.split(" ")[1];
		}

		// 2. fallback to cookies (browser support)
		else if (req.cookies?.jwt) {
			token = req.cookies.jwt;
		}
		if (!token) {
			return res.status(401).json({error: "Unauthorized"})
		}

		const verifToken = jwt.verify(token, process.env.JWT_SECRET);

		const user = await prisma.user.findUnique({
			where: {
				id: verifToken.id,
			},
		});

		if (!user) {
			return res.status(401).json({error: "User not found"});
		}

		req.user = user;
		next();
	} catch (error) {
		return res.status(401).json({
			error: "Invalid or expired token",
		});
	}
};