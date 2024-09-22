import { CustomError } from "../../domain";
import logger from "../utils/logger";
import prismaClient from "../utils/prismaClient";

export class UserService {
  constructor() {}

  public async getUser(email: string) {
    try {
      const user = await prismaClient.userModel.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        const { email, id } = user;
        return {
          email,
          id,
        };
      }

      logger.error(`Error - user.service - User not exist - email=${email}`);

      throw CustomError.badRequest("User not exist");
    } catch (error) {
      logger.error(`Error - user.service - email=${email}`, error);
      throw CustomError.internalServerError(`${error}`);
    }
  }
}
