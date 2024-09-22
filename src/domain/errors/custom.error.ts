import logger from "../../presentation/utils/logger";
import { isExpectedError } from "../enums/ExpectedErrors";

export class CustomError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message);
  }

  static badRequest(message?: string, shouldLog: boolean = true) {
    if (shouldLog && message && !isExpectedError(message)) {
      logger.error(message);
    }
    return new CustomError(400, message ? message : "Bad Request");
  }

  static unauthorized(message?: string) {
    logger.error(message);
    return new CustomError(401, message ? message : "Unauthorized");
  }

  static forbidden(message?: string) {
    logger.error(message);
    return new CustomError(403, message ? message : "Forbidden");
  }

  static notFound(message?: string) {
    logger.error(message);
    return new CustomError(404, message ? message : "Bad Request");
  }

  static internalServerError(message?: string) {
    logger.error(message);
    return new CustomError(500, message ? message : "Internal server");
  }

  static expectedError(message?: string) {
    logger.info("EXPECTED ERROR", message);
    return new CustomError(200, message ? message : "Internal server");
  }
}
