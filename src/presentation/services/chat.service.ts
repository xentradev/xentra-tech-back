import { CustomError } from "../../domain";
import Message from "../../domain/entities/message.entity";
import { MessageDTO } from "../../domain/dto/chat/message";
import { isExpectedError } from "../../domain/enums/ExpectedErrors";
import logger from "../utils/logger";
import {
  createThread,
  createThread as createThreadOpenAI,
  sendMessageToAssistantInAThread,
} from "../utils/openAI";
import { BotModel } from "@prisma/client";
import prismaClient from "../utils/prismaClient";
import WhastappManager from "../utils/WhatsappManager";

export class ChatService {
  constructor() {}

  public async createThread(): Promise<string> {
    try {
      return createThreadOpenAI();
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  public async handleInternalMessage({
    messages,
    botId,
  }: {
    messages: MessageDTO[];
    botId: string;
  }): Promise<MessageDTO> {
    try {
      const messagesJoin = messages
        .map((message) => message.text)
        .join(" [br] ");

      if (!(messages.length > 0)) {
        throw CustomError.badRequest("MESSAGES - EMPTY ARRAY");
      }

      const thread = messages[0].threadId;

      const from: "internal-chat" | "whatsapp" | "unknown" =
        (messages[0].from as "internal-chat" | "whatsapp") || "unknown";

      const botInfo = await prismaClient.botModel.findFirst({
        where: {
          id: +botId,
        },
      });

      if (!botInfo) {
        throw CustomError.internalServerError("BOT NOT FOUND" + botInfo);
      }

      let assistantMessageOpenAI = await this.processOpenAIMessage(
        messagesJoin,
        thread,
        from,
        botInfo
      );

      return {
        id: -1,
        botId: +botId,
        createdAt: new Date(),
        from,
        text: assistantMessageOpenAI.text,
        threadId: thread,
      };
    } catch (error: any) {
      if (!isExpectedError(error.message)) {
        logger.error(error);
      }

      throw error;
    }
  }

  public async handleWhatsappMessage({
    phoneNumberID,
    from,
    text,
  }: {
    phoneNumberID: string;
    from: string;
    text: string;
  }) {
    try {
      const botInfo = await prismaClient.botModel.findFirst({
        where: {
          whatsappPhoneId: phoneNumberID,
        },
      });
      if (!botInfo) {
        // podriamos validar que hacer en este caso, pero claramente es un terrible error nuestro
        return;
      }
      const whatsappThread = await prismaClient.whatsappThreads.findFirst({
        where: {
          whatsapp_num: from,
          botId: botInfo.id,
        },
      });
      let thread: string | undefined = whatsappThread?.threadId;
      if (!whatsappThread) {
        thread = await createThread();
        await prismaClient.whatsappThreads.create({
          data: {
            threadId: thread,
            whatsapp_num: from,
            bot: { connect: { id: botInfo.id } },
          },
        });
      }

      if (!thread) {
        // podriamos validar que hacer en este caso, pero claramente es un terrible error nuestro
        return;
      }
      const assistantMessageOpenAI = await this.processOpenAIMessage(
        text,
        thread,
        "whatsapp",
        botInfo
      );

      const messages = assistantMessageOpenAI.text.split("[br]");

      messages.forEach(async (message) => {
        await WhastappManager.sendMessage({
          accessToken: botInfo.whatsappAccessToken,
          phoneNumId: botInfo.whatsappPhoneId,
          text: message,
          to: from,
        });
      });

      return true;
    } catch (error) {
      logger.error(
        `Error - whatsapp.service - phoneNumberID=${phoneNumberID} - from=${from} - text=${text}`,
        error
      );
      throw CustomError.internalServerError(`${error}`);
    }
  }

  // nada particular de wp o telegram o lo que sea
  public processOpenAIMessage = async (
    message: string,
    thread: string,
    from: "internal-chat" | "whatsapp" | "unknown",
    bot: BotModel
  ): Promise<Message> => {
    // handle business logic
    console.log(
      `Processing chatgpt - bot: ${JSON.stringify(bot)} - from: ${from}`
    );

    const assistantMessageOpenAI = await sendMessageToAssistantInAThread({
      message,
      thread,
      from: "chat",
      assistantId: bot.assistantId,
    });

    // handle business logic with the chatgpt response

    return {
      text: assistantMessageOpenAI?.text,
    };
  };
}
