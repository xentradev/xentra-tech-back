import { Router } from "express";
import { AuthService } from "../services/auth.service";
import { AuthController } from "./controller";

export class Auth {
  static get routes(): Router {
    const router = Router();
    const authService = new AuthService();
    const controller = new AuthController(authService);

    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);

    return router;
  }
}
