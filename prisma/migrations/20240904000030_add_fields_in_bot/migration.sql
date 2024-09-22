/*
  Warnings:

  - Added the required column `assistantId` to the `Bot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Bot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bot" ADD COLUMN     "assistantId" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;
