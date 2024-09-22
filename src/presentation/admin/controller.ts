import { HandleError } from "../utils/HandleError";
import { AdminService } from "../services/admin.service";
import { Request, Response } from "express";

export class AdminController extends HandleError {
  constructor(public readonly adminService: AdminService) {
    super();
  }

  createAi = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(500).send("Token error");
      }
      await this.adminService
        .createAi(req.body, req.user.id)
        .then((data) => res.json(data))
        .catch((error) => this.handleError(error, res));
    } catch (error) {
      this.handleError(error, res);
    }
  };

  editAi = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(500).send("Token error");
      }
      await this.adminService
        .editAi(Number(req.params.id), req.body)
        .then((data) => res.json(data))
        .catch((error) => this.handleError(error, res));
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAis = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(500).send("Token error");
      }
      await this.adminService
        .getAis(req.user.id)
        .then((data) => res.json(data))
        .catch((error) => this.handleError(error, res));
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getAiById = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(500).send("Token error");
      }
      await this.adminService
        .getAiById(Number(req.params.id))
        .then((data) => res.json(data))
        .catch((error) => this.handleError(error, res));
    } catch (error) {
      this.handleError(error, res);
    }
  };

  getPublicAiById = async (req: Request, res: Response) => {
    await this.adminService
      .getPublicAiById(Number(req.params.id))
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  addImageAvatar = async (req: Request, res: Response) => {
    const { imageB64 } = req.body;
    await this.adminService
      .uploadAvatarImage(imageB64, Number(req.params.id))
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
