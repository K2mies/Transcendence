-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" BYTEA;

-- CreateIndex
CREATE INDEX "Message_senderId_receiverId_createdAt_idx" ON "Message"("senderId", "receiverId", "createdAt");

-- CreateIndex
CREATE INDEX "Message_receiverId_senderId_createdAt_idx" ON "Message"("receiverId", "senderId", "createdAt");
