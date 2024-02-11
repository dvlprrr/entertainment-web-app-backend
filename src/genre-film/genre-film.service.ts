import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateGenreFilmDto } from "./dto/create-genre-film.dto";
import { UpdateGenreFilmDto } from "./dto/update-genre-film.dto";

@Injectable()
export class GenreFilmService {
  constructor(private readonly prisma: PrismaService) {}

  async createGenre(dto: CreateGenreFilmDto) {
    try {
      const genre = await this.prisma.genreFilm.create({
        data: { name: dto.name },
      });

      return genre;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllGenres() {
    try {
      const genres = await this.prisma.genreFilm.findMany();
      return genres;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateGenreName(dto: UpdateGenreFilmDto, id: string) {
    try {
      const updatedGenre = this.prisma.genreFilm.update({
        where: { id: Number(id) },
        data: { name: dto.name },
      });
      return updatedGenre;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteGenre(id: string) {
    try {
      const deletedGenres = await this.prisma.genreFilm.delete({
        where: { id: Number(id) },
      });
      return deletedGenres;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
