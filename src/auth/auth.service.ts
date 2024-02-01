import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { PrismaService } from "src/prisma.service";
import { UserService } from "src/user/user.service";
import { generateTokenDto } from "./dto/generateTokenDto";
import { registerUserDto } from "./dto/registerUserDto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) {}

  async generateToken(dto: generateTokenDto) {
    const payload = { ...dto };

    const token = jwt.sign(payload, "Secret-key");

    return token;
  }

  async registerUser(dto: registerUserDto) {
    try {
      const potentialUser = await this.userService.findUserByEmail({
        email: dto.email,
      });

      if (potentialUser) {
        throw new HttpException(
          "Пользователь с таким email уже существует",
          HttpStatus.CONFLICT
        );
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.userService.createUser({
        email: dto.email,
        password: hashedPassword,
      });
      return this.generateToken(user);
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email: data.email },
    });
  }
}
