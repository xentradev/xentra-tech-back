import { Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import logger from "./logger";

export class HandleError {
  constructor() {}

  protected handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  };
}
