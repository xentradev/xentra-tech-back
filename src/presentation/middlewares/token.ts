import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { jwtAdapter } from "../../config";
import logger from "../utils/logger";

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        id: number;
      };
    }
  }
}

export class TokenMiddleware {
  constructor() {}

  validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        logger.info(`ERROR - middleware token - token is missing`);
        return res.status(401).send("Token is missing");
      }
      var tokensParts = token.split(".");

      if (tokensParts.length !== 3) {
        logger.info(
          `ERROR - middleware token - token is malformed - token=${token}`
        );
        return res.status(401).send("Token malformed");
      }

      const userData = (await jwtAdapter.decodeToken(token)) as JwtPayload;

      if (!userData.email || !userData.id) {
        logger.error(
          `ERROR - middleware token - email or id not provided in the token - email=${userData.email} - id=${userData.id}`
        );
        return res.status(401).send("Error processing token");
      }
      req.user = {
        email: userData.email,
        id: userData.id,
      };
      next();
    } catch (e) {
      const token = req.headers.authorization?.split(" ")[1];
      logger.error(`ERROR - middleware token -  token=${token} `, e);
      res.status(401).send("Error validating token");
    }
  };
}
