import { Router } from "express";
import { AdminController } from "./controller";
import { AdminService } from "../services/admin.service";
import { FileManagerService } from "../services/filemanager.service";
import { TokenMiddleware } from "../middlewares/token";

export class Admin {
  static get routes(): Router {
    const router = Router();
    const fileManagerService = new FileManagerService();
    const adminService = new AdminService(fileManagerService);
    const controller = new AdminController(adminService);
    const token = new TokenMiddleware();

    router.post("/create-ai", token.validate, controller.createAi);
    router.get("/my-ai", token.validate, controller.getAis);
    router.get("/my-ai/:id", token.validate, controller.getAiById);
    router.get("/my-ai/public/:id", controller.getPublicAiById);
    router.put("/my-ai/:id", token.validate, controller.editAi);
    router.post(
      "/my-ai/avatar-image/:id",
      token.validate,
      controller.addImageAvatar
    );

    return router;
  }
}
