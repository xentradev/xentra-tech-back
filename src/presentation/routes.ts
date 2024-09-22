import { Router } from "express";
import { Chat } from "./chat/routes";
import { Admin } from "./admin/routes";
import { Auth } from "./auth/routes";
import { User } from "./user/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/admin", Admin.routes);
    router.use("/api/chat", Chat.routes);
    router.use("/api/auth", Auth.routes);
    router.use("/api/user", User.routes);

    return router;
  }
}
