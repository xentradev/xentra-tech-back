import axios from "axios";
import { CustomError } from "../../domain";
import logger from "../utils/logger";
import { createThread, sendMessageToAssistantInAThread } from "../utils/openAI";
import formatPhoneNumber from "../utils/formatPhoneNumber";
import prismaClient from "../utils/prismaClient";

export class WhatsappService {
  constructor() {}

  public async receiveWhatsappMessage({
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
      const assistantMessageOpenAI = await sendMessageToAssistantInAThread({
        message: text,
        thread: thread,
        from: "chat",
        assistantId: botInfo.assistantId,
      });

      this.sendMessage(from, assistantMessageOpenAI.text);

      return true;
    } catch (error) {
      logger.error(
        `Error - whatsapp.service - phoneNumberID=${phoneNumberID} - from=${from} - text=${text}`,
        error
      );
      throw CustomError.internalServerError(`${error}`);
    }
  }

  public async sendMessage(to: string, text: string) {
    try {
      const formattedTo = formatPhoneNumber(to);
      await axios({
        method: "POST",
        url: `https://graph.facebook.com/v16.0/364503900089878/messages`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer EAAReN9wK38sBOZBVW8baeE4rarDZBOQGWqUZCJEWZCjZBMj3ELivEmtZC7eOAAAFfhR3yBK3FW9iBZB5lLwr4u6nNqzMppqeOanyyaxzP3DBBMZCQiC8SV7oC7sDequunmTl2Gy2LYDrcoXxWh58AwnnC8wposVYead1DnZCU396eifKXOI2kZBcJHnhPHfvJAJAC4tERPooSbBqxbYMtYitHtsV6JPOU7GIWGkIUZD`,
        },
        data: {
          messaging_product: "whatsapp",
          to: formattedTo,
          text: { body: text },
        },
      });
    } catch (error: any) {
      console.error(
        "Error al enviar el mensaje:",
        error.response ? error.response.data : error.message
      );
    }
  }
}
