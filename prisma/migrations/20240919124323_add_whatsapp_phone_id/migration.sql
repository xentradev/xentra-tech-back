-- AlterTable
ALTER TABLE "BotModel" ADD COLUMN     "whatsappPhoneId" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "WhatsappThreads" (
    "id" SERIAL NOT NULL,
    "botId" INTEGER NOT NULL,
    "whatsapp_num" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WhatsappThreads_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WhatsappThreads" ADD CONSTRAINT "WhatsappThreads_botId_fkey" FOREIGN KEY ("botId") REFERENCES "BotModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
