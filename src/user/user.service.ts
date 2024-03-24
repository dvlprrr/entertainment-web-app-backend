import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { createUserDto } from "./dto/createUserDto";
import { findUserByEmailDto } from "./dto/findUserByEmailDto";
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
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          email: true,
          avatar: true,
          id: true,
          role: true,
          FavoriteMovie: { select: { movieId: true } },
        },
      });

      if (!user) {
        throw new HttpException(
          `Пользователя с id:${id} не существует`,
          HttpStatus.NOT_FOUND
        );
      }

      const res = {
        id: user.id,
        email: user.email,
        avatar: user.avatar,
        role_id: user.role.id,
        favourite_movies: user.FavoriteMovie.map((movie) => {
          return movie.movieId;
        }),
      };

      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findUserByEmail(dto: findUserByEmailDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllUsers() {
    try {
      const users = this.prisma.user.findMany();
      return users;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(email: string, avatar: string, id: number) {
    const user = await this.findUserById(id);

    if (!user) {
      throw new HttpException(
        "Пользователь с таким id не зарегестрирован",
        HttpStatus.NOT_FOUND
      );
    }

    await this.prisma.user.update({
      where: { id },
      data: { email, avatar },
    });

    return {
      message: "Данные пользователя успешно обновленны",
    };
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
