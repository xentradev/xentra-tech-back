/*
  Warnings:

  - Added the required column `userId` to the `BotModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BotModel" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "name" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "BotModel" ADD CONSTRAINT "BotModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
