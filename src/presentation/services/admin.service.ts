import { BotModel } from "@prisma/client";
import { AddBotDto } from "../../domain/dto/admin/add-bot.dto";
import logger from "../utils/logger";
import prismaClient from "../utils/prismaClient";
import { FileManagerService } from "./filemanager.service";

export class AdminService {
  constructor(public readonly fileManagerService: FileManagerService) {}

  public async createAi(addBotDto: AddBotDto, userId: number): Promise<number> {
    try {
      let imageUrl: string = "";
      if (addBotDto.imageB64) {
        imageUrl = await this.fileManagerService.uploadFileToS3B64(
          addBotDto.imageB64
        );
      }

      const bot = await prismaClient.botModel.create({
        data: {
          name: addBotDto.name,
          description: addBotDto.description,
          assistantId: addBotDto.assistantId,
          avatar: imageUrl,
          backgroundColor: addBotDto.backgroundColor,
          primaryMainColor: addBotDto.primaryMainColor,
          textColor: addBotDto.textColor,
          user: { connect: { id: userId } },
        },
      });

      return bot.id;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  public async getAis(userId: number): Promise<BotModel[]> {
    try {
      const bots = await prismaClient.botModel.findMany({
        where: {
          userId,
        },
      });

      return bots;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  public async getAiById(id: number): Promise<BotModel | null> {
    try {
      const bot = await prismaClient.botModel.findUnique({
        where: {
          id,
        },
      });

      return bot;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  public async getPublicAiById(id: number): Promise<BotModel | null> {
    try {
      const bot = await prismaClient.botModel.findUnique({
        where: {
          id,
        },
      });

      return bot;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  public async editAi(id: number, editBotDto: AddBotDto): Promise<number> {
    try {
      let imageUrl: string = "";
      if (editBotDto.imageB64) {
        imageUrl = await this.fileManagerService.uploadFileToS3B64(
          editBotDto.imageB64
        );
      }

      const bot = await prismaClient.botModel.update({
        where: {
          id,
        },
        data: {
          name: editBotDto.name,
          description: editBotDto.description,
          assistantId: editBotDto.assistantId,
          backgroundColor: editBotDto.backgroundColor,
          primaryMainColor: editBotDto.primaryMainColor,
          textColor: editBotDto.textColor,
          ...(editBotDto.imageB64 && { avatar: imageUrl }),
        },
      });

      return bot.id;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async uploadAvatarImage(imageB64: string, botId: number) {
    try {
      // if (!userId) {
      //   throw CustomError.internalServerError("USER NOT FOUND");
      // }

      const imageUrl = await this.fileManagerService.uploadFileToS3B64(
        imageB64
      );

      await prismaClient.botModel.update({
        where: {
          id: botId,
        },
        data: {
          avatar: imageUrl,
        },
      });

      return imageUrl;
    } catch (e) {
      logger.error("image.service - generate image - ", e);
      throw e;
    }
  }
}
