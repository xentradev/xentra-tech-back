import { Router } from "express";
import { ChatService } from "../services/chat.service";
import { ChatController } from "./controller";

export class Chat {
  static get routes(): Router {
    const router = Router();
    const chatService = new ChatService();
    const controller = new ChatController(chatService);

    // permite crear el thread de conversacion del lado del cliente
    router.post("/thread",  controller.createThread);

    // procesa mensajes del lado del chat interno
    router.post("/channel/internal/message", controller.receiveInternalMessage);

    
    router.post("/channel/whatsapp/message", controller.receiveWhatsappMessage);
    router.get("/channel/whatsapp/message", controller.verifyWhatsapp);


    //router.post("/channel/telegram/message", controller.receiveWhatsappMessage);
    //router.post("/channel/external-test1/message", controller.receiveWhatsappMessage);


    return router;
  }
}
