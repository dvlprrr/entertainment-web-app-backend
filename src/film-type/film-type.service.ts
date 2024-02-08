import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateFilmTypeDto } from "./dto/create-film-type.dto";
import { UpdateFilmTypeDto } from "./dto/update-film-type.dto";

@Injectable()
export class FilmTypeService {
  constructor(private prisma: PrismaService) {}

  async createFilmType(dto: CreateFilmTypeDto) {
    try {
      const filmType = await this.prisma.filmType.create({ data: dto });

      return filmType;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllTypes() {
    const filmTypes = await this.prisma.filmType.findMany();

    return filmTypes;
  }
  async updateType(dto: UpdateFilmTypeDto, id: string) {
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
