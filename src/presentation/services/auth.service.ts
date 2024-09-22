import { envs, jwtAdapter } from "../../config";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { CustomError, LoginUserDto, UserEntity } from "../../domain";
import { RegisterUserDto } from "../../domain/dto/auth/register-user.dto";
import { ExpectedErrors } from "../../domain/enums/ExpectedErrors";
import logger from "../utils/logger";
import prismaClient from "../utils/prismaClient";

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUSer = await prismaClient.userModel.findUnique({
      where: {
        email: registerUserDto.email.toLowerCase(),
      },
    });

    if (existUSer) throw CustomError.badRequest(ExpectedErrors.EMAIL_EXIST);

    // if (!validateEmail(registerUserDto.email))
    //   throw CustomError.badRequest("invalid_email");

    try {
      registerUserDto.password = bcryptAdapter.hash(registerUserDto.password);

      const user = await prismaClient.userModel.create({
        data: {
          email: registerUserDto.email.toLowerCase(),
          password: registerUserDto.password,
        },
      });

      const { password, ...rest } = UserEntity.fromObject(user);

      const token = await jwtAdapter.generateToken({
        id: user.id,
        email: user.email,
      });

      if (!token)
        throw CustomError.internalServerError("Error while creating JWT");

      return token;
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  public async loginUser(loginUser: LoginUserDto) {
    const user = await prismaClient.userModel.findUnique({
      where: {
        email: loginUser.email.toLowerCase(),
      },
    });

    if (!user) {
      logger.error(`User not found: ${loginUser.email}`);
      throw CustomError.badRequest("email_not_exist", true);
    }

    const isMatch = bcryptAdapter.compare(
      loginUser.password,
      user.password as string
    );

    if (!isMatch) throw CustomError.badRequest("incorrect_password", false);

    const { password, ...rest } = UserEntity.fromObject(user);

    const token = await jwtAdapter.generateToken({
      id: user.id,
      email: user.email,
    });

    if (!token)
      throw CustomError.internalServerError("Error while creating JWT");

    return {
      key: token,
    };
  }
}
