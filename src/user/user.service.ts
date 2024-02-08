import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { createUserDto } from "./dto/createUserDto";
import { findUserByEmailDto } from "./dto/findUserByEmailDto";
import { updateUserDto } from "./dto/updateUserDto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: createUserDto) {
    try {
      const user = await this.prisma.user.create({ data: dto });
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findUserById(id: number) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id,
        },
        select: { email: true, id: true, role: true },
      });

      if (!user) {
        throw new HttpException(
          `Пользователя с id:${id} не существует`,
          HttpStatus.BAD_REQUEST
        );
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findUserByEmail(dto: findUserByEmailDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    return user;
  }

  async updateUser(dto: updateUserDto) {
    const user = await this.findUserById(dto.id);

    if (!user) {
      throw new HttpException(
        "Пользователь с таким id не зарегестрирован",
        HttpStatus.BAD_REQUEST
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: dto.id },
      data: { email: dto.newEmail },
    });

    return updatedUser;
  }

  async deleteUser(id: number) {
    const user = await this.findUserById(id);

    if (!user) {
      throw new HttpException(
        "Пользователь с таким id не зарегестрирован",
        HttpStatus.BAD_REQUEST
      );
    }

    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });
    return {
      message: "Пользователь успешно удален",
      deletedUser,
    };
  }
}
