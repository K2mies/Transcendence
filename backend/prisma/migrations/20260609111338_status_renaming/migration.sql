/*
  Warnings:

  - You are about to drop the column `platformId` on the `UserGameRelation` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `UserGameRelation` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `UserUserRelation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,gameId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,gameId]` on the table `UserGameRelation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `friendStatus` to the `UserUserRelation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserGameRelation" DROP CONSTRAINT "UserGameRelation_platformId_fkey";

-- DropIndex
DROP INDEX "UserGameRelation_userId_gameId_platformId_key";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "platformId" INTEGER;

-- AlterTable
ALTER TABLE "UserGameRelation" DROP COLUMN "platformId",
DROP COLUMN "status",
ADD COLUMN     "gameStatus" "GameStatus";

-- AlterTable
ALTER TABLE "UserUserRelation" DROP COLUMN "status",
ADD COLUMN     "friendStatus" "FriendshipStatus" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_gameId_key" ON "Review"("userId", "gameId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGameRelation_userId_gameId_key" ON "UserGameRelation"("userId", "gameId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE CASCADE ON UPDATE CASCADE;
