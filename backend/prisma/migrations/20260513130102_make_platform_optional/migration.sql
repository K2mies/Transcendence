-- DropForeignKey
ALTER TABLE "UserGameRelation" DROP CONSTRAINT "UserGameRelation_platformId_fkey";

-- AlterTable
ALTER TABLE "UserGameRelation" ALTER COLUMN "platformId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserGameRelation" ADD CONSTRAINT "UserGameRelation_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE SET NULL ON UPDATE CASCADE;
