-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERUSER', 'ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
