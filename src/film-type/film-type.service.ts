import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class FilmTypeService {
  constructor(private prisma: PrismaService) {}

  async createFilmType(dto: { type: string }) {
    try {
      const filmType = await this.prisma.filmType.create({ data: dto });

      return filmType;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllTypes() {
    try {
      const filmTypes = await this.prisma.filmType.findMany();
      return filmTypes;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async updateType(dto: { type: string }, id: string) {
    try {
      const updatedFilmType = await this.prisma.filmType.update({
        where: { id: Number(id) },
        data: { type: dto.type },
      });

      return updatedFilmType;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async deleteType(id: string) {
    try {
      const deletedType = await this.prisma.filmType.delete({
        where: { id: Number(id) },
      });

      return {
        message: "Тип фильма успешно удален",
        deletedType,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
