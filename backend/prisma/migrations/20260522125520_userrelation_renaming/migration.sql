/*
  Warnings:

  - The values [NONE] on the enum `FriendshipStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `friendId` on the `UserUserRelation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserUserRelation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderId,receiverId]` on the table `UserUserRelation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiverId` to the `UserUserRelation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `UserUserRelation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FriendshipStatus_new" AS ENUM ('PENDING', 'FRIENDS');
ALTER TABLE "UserUserRelation" ALTER COLUMN "status" TYPE "FriendshipStatus_new" USING ("status"::text::"FriendshipStatus_new");
ALTER TYPE "FriendshipStatus" RENAME TO "FriendshipStatus_old";
ALTER TYPE "FriendshipStatus_new" RENAME TO "FriendshipStatus";
DROP TYPE "public"."FriendshipStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "UserUserRelation" DROP CONSTRAINT "UserUserRelation_friendId_fkey";

-- DropForeignKey
ALTER TABLE "UserUserRelation" DROP CONSTRAINT "UserUserRelation_userId_fkey";

-- DropIndex
DROP INDEX "UserUserRelation_userId_friendId_key";

-- AlterTable
ALTER TABLE "UserUserRelation" DROP COLUMN "friendId",
DROP COLUMN "userId",
ADD COLUMN     "receiverId" INTEGER NOT NULL,
ADD COLUMN     "senderId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserUserRelation_senderId_receiverId_key" ON "UserUserRelation"("senderId", "receiverId");

-- AddForeignKey
ALTER TABLE "UserUserRelation" ADD CONSTRAINT "UserUserRelation_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUserRelation" ADD CONSTRAINT "UserUserRelation_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
