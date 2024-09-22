import jwt from "jsonwebtoken";
import { envs } from "./envs";
import logger from "../presentation/utils/logger";

const JWT_SEED = envs.JWT_SEED;

export const jwtAdapter = {
  async generateToken(payload: any, duration: string = "30d") {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) throw resolve(null);

        resolve(token);
      });
    });
  },

  validateToken(payload: string) {
    return new Promise((resolve) => {
      jwt.verify(payload, JWT_SEED, (err, decoded) => {
        if (err) return resolve(null);

        resolve(decoded);
      });
    });
  },

  async decodeToken(payload: any) {
    try {
      const decoded = jwt.verify(payload, envs.JWT_SEED);

      if (decoded) return decoded;
    } catch (err) {
      logger.error("err", err);
      throw err
    }
  },
};
