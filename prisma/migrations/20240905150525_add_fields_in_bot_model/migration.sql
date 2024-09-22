-- AlterTable
ALTER TABLE "BotModel" ADD COLUMN     "primaryMainColor" TEXT NOT NULL DEFAULT '#FFF',
ADD COLUMN     "textColor" TEXT NOT NULL DEFAULT '#FFF',
ALTER COLUMN "backgroundColor" SET DEFAULT '#FFF';
