import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient() //we create one prisma client, this works as a "handler" to communicate with db