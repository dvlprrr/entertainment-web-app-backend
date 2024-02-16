import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { UserService } from "src/user/user.service";
import { generateTokenDto } from "./dto/generateTokenDto";
import { loginUserDto } from "./dto/loginUserDto";
import { registerUserDto } from "./dto/registerUserDto";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async generateToken(dto: generateTokenDto) {
    try {
      const payload = { email: dto.email, id: dto.id, roleId: dto.roleId };

      const token = jwt.sign(payload, process.env.SECRET_KEY);

      return token;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
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
        roleId: dto.roleId ?? 1,
      });
      return {
        message: "User has been successfully created",
        user,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async loginUser(dto: loginUserDto) {
    try {
      const user = await this.userService.findUserByEmail({ email: dto.email });

      if (!user) {
        throw new HttpException(
          "Пользователь с таким email не зарегестрирован",
          HttpStatus.BAD_REQUEST
        );
      }

      const matchedPassword = await bcrypt.compare(dto.password, user.password);
      let token;

      if (matchedPassword) {
        token = await this.generateToken({
          email: user.email,
          id: user.id,
          roleId: user.roleId,
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userData } = user;
      return { token, ...userData };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getCurrentUser(id: number) {
    try {
      const user = await this.userService.findUserById(id);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
