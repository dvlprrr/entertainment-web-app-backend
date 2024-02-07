import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { createUserDto } from "./dto/createUserDto";
import { findUserByEmailDto } from "./dto/findUserByEmailDto";
import { findUserByIdDto } from "./dto/findUserByIdDto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: createUserDto) {
    const user = await this.prisma.user.create({ data: dto });
    console.log(user, "USER");
    return user;
  }

  async findUserById(dto: findUserByIdDto) {
    const { id } = dto;

    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
      select: { email: true, id: true, role: true },
    });

    if (!user) {
      throw new HttpException(
        `Пользователя с id:${dto.id} не существует`,
        HttpStatus.BAD_REQUEST
      );
    }
    return user;
  }

  async findUserByEmail(dto: findUserByEmailDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    return user;
  }
}
