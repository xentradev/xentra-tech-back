import { Request, Response } from "express";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";
import { HandleError } from "../utils/HandleError";

export class AuthController extends HandleError {
  constructor(public readonly authService: AuthService) {
    super();
  }

  registerUser = async (req: Request, res: Response) => {
    try {
      const [error, registerDto] = RegisterUserDto.create(req.body);

      if (error) return res.status(400).json({ error });

      const authResponse = await this.authService.registerUser(registerDto!);
      return res.json(authResponse);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const [error, loginDto] = LoginUserDto.create(req.body);

      if (error) return res.status(400).json({ error });

      const authResponse = await this.authService.loginUser(loginDto!);
      return res.json(authResponse);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
