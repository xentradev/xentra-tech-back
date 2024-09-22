/*
  Warnings:

  - You are about to drop the `Bot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Messages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Bot";

-- DropTable
DROP TABLE "Messages";

-- CreateTable
CREATE TABLE "BotModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "assistantId" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,

    CONSTRAINT "BotModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessagesModel" (
    "id" SERIAL NOT NULL,
    "from" TEXT NOT NULL DEFAULT 'chat',
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "threadId" TEXT NOT NULL,

    CONSTRAINT "MessagesModel_pkey" PRIMARY KEY ("id")
);
