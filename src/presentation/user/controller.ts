import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HandleError } from "../utils/HandleError";

export class UserController extends HandleError {
  constructor(public readonly userService: UserService) {
    super();
  }

  getUser = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(500).send("Token error");
      }

      let userResponse = await this.userService.getUser(req.user.email);

      return res.json(userResponse);
    } catch (error) {
      return this.handleError(error, res);
    }
  };
}
