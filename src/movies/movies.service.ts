import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateMovieDto } from "./dto/create-movie.dto";

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async createMovieCard(dto: CreateMovieDto) {
    try {
      const genreIds = dto.genre.map((genreId) => ({ id: genreId }));

      const movie = await this.prisma.movie.create({
        data: {
          title: dto.title,
          url: dto.url,
          year: dto.year,
          typeId: dto.typeId,
          ageRating: dto.ageRating,
          genreFilm: {
            connect: genreIds,
          },
        },
      });
      return movie;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllMovies() {
    try {
      const movies = await this.prisma.movie.findMany({
        include: {
          genreFilm: true,
        },
      });

      return movies;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findMovieById({ id }: { id: string }) {
    try {
      const movie = await this.prisma.movie.findUnique({
        where: { id: Number(id) },
      });

      if (!movie) {
        throw new HttpException(
          "Фильм с таким id не был найден",
          HttpStatus.NOT_FOUND
        );
      }

      return movie;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteMovieById({ id }: { id: string }) {
    try {
      const deletedMovie = await this.prisma.movie.delete({
        where: { id: Number(id) },
      });

      if (!deletedMovie) {
        throw new HttpException(
          "Фильм с таким id не был найден",
          HttpStatus.NOT_FOUND
        );
      }

      return {
        message: "Фильм успешно удален",
        deletedMovie,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
