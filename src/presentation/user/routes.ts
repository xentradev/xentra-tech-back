import { Router } from "express";
import { TokenMiddleware } from "../middlewares/token";
import { UserService } from "../services/user.service";
import { UserController } from "./controller";
const token = new TokenMiddleware();

export class User {
  static get routes(): Router {
    const router = Router();
    const userService = new UserService();
    const controller = new UserController(userService);

    router.get("/me", token.validate, controller.getUser);

    return router;
  }
}
