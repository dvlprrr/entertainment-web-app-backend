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
          ageRatingId: dto.ageRatingId,
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

  async findAllMovies(filterValue: string) {
    try {
      const movies = await this.prisma.movie.findMany({
        where: { title: { contains: filterValue } },
        select: {
          id: true,
          url: true,
          title: true,
          year: true,
          filmType: { select: { type: true } },
          AgeRating: { select: { name: true } },
          genreFilm: { select: { name: true } },
        },
      });
      const res = movies.map((movie) => ({
        id: movie.id,
        url: movie.url,
        title: movie.title,
        year: movie.year,
        filmType: movie.filmType.type,
        ageRating: movie.AgeRating.name,
        genreFilm: movie.genreFilm.map((genre) => genre.name),
      }));
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findTvSeries(filterValue: string) {
    try {
      const tvSeries = await this.prisma.movie.findMany({
        where: { AND: [{ typeId: 2 }, { title: { contains: filterValue } }] },
        select: {
          id: true,
          url: true,
          title: true,
          year: true,
          filmType: { select: { type: true } },
          AgeRating: { select: { name: true } },
          genreFilm: { select: { name: true } },
        },
      });

      const res = await tvSeries.map((movie) => ({
        id: movie.id,
        url: movie.url,
        title: movie.title,
        year: movie.year,
        filmType: movie.filmType.type,
        ageRating: movie.AgeRating.name,
        genreFilm: movie.genreFilm.map((genre) => genre.name),
      }));
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findMovies(filterValue: string) {
    try {
      const movies = await this.prisma.movie.findMany({
        where: { AND: [{ typeId: 1 }, { title: { contains: filterValue } }] },
        select: {
          id: true,
          url: true,
          title: true,
          year: true,
          filmType: { select: { type: true } },
          AgeRating: { select: { name: true } },
          genreFilm: { select: { name: true } },
        },
      });

      const res = await movies.map((movie) => ({
        id: movie.id,
        url: movie.url,
        title: movie.title,
        year: movie.year,
        filmType: movie.filmType.type,
        ageRating: movie.AgeRating.name,
        genreFilm: movie.genreFilm.map((genre) => genre.name),
      }));
      return res;
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
