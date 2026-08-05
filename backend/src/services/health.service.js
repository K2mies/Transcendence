import { prisma } from "../config/db.js";

export async function checkDB() {
	return prisma.$queryRaw`SELECT 1`;
}