import { Request, Response } from "express";
import { ChatService } from "../services/chat.service";
import { MessageDTO } from "../../domain/dto/chat/message";
import { HandleError } from "../utils/HandleError";
import { envs } from "../../config";

export class ChatController extends HandleError {
  constructor(public readonly chatService: ChatService) {
    super();
  }

  receiveInternalMessage = async (req: Request, res: Response) => {
    try {
      if (!req.body?.messages || !req.body?.botId) {
        return res
          .status(400)
          .send("Bad request: Missing messages or botId");
      }
      const messages: MessageDTO[] = req.body.messages;
      const botId: string = req.body.botId;

      const messageResponse = await this.chatService.handleInternalMessage({
        messages,
        botId,
      });
      return res.json(messageResponse);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  receiveWhatsappMessage = async (req: Request, res: Response) => {
    try {
      const changes = req.body.entry[0].changes[0];

      if (changes.field)
        if (changes.field === "messages" && changes.value.messages) {
          // Extraemos los mensajes y el assistantId del cuerpo de la solicitud
          const message = req.body.entry[0].changes[0].value.messages[0];
          const phoneNumberID =
            req.body.entry[0].changes[0].value.metadata.phone_number_id;
          const from: string = message.from; // Puede ser un número de teléfono
          const text: string = message.text.body;

          await this.chatService.handleWhatsappMessage({
            phoneNumberID,
            from,
            text,
          });
        } else if (changes.value.statuses) {
          // Si no es un mensaje, maneja las notificaciones de estado
          const statusUpdate = changes.value.statuses[0];
          const messageStatus = statusUpdate.status;
          const recipientId = statusUpdate.recipient_id;

          console.log(
            `Estado del mensaje actualizado para ${recipientId}: ${messageStatus}`
          );
        }

      res.sendStatus(200);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  verifyWhatsapp = async (req: Request, res: Response) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    console.log(token);
    if (mode === "subscribe" && token === envs.WP_VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  };

  createThread = async (req: Request, res: Response) => {
    await this.chatService
      .createThread()
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
