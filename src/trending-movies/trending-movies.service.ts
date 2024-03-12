import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class TrendingMoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async addMovieToTrending({ movieId }: { movieId: number }) {
    try {
      const isMovieInTrending = await this.prisma.trendingMovie.findFirst({
        where: { movieId },
      });

      if (isMovieInTrending) {
        try {
          await this.prisma.trendingMovie.deleteMany({
            where: { movieId },
          });

          return {
            message: "Вы успешно удалили фильм из трендов",
          };
        } catch (error) {
          throw new HttpException(
            `Ошибка при удалении фильма из трендов: ${error.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        }
      } else {
        try {
          await this.prisma.trendingMovie.create({
            data: { movieId: movieId },
          });
          return {
            message: "Вы успешно добавили фильм в тренды",
          };
        } catch (error) {
          throw new HttpException(
            `Ошибка при добавлении фильма в тренды: ${error.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        }
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findTrendingMovies() {
    try {
      const res = await this.prisma.trendingMovie.findMany({
        select: {
          movie: {
            select: {
              id: true,
              url: true,
              title: true,
              year: true,
              AgeRating: { select: { name: true } },
              filmType: { select: { type: true } },
            },
          },
        },
      });

      const trendingMovies = res.map((movie) => ({
        id: movie.movie.id,
        url: movie.movie.url,
        title: movie.movie.title,
        year: movie.movie.year,
        ageRating: movie.movie.AgeRating.name,
        filmType: movie.movie.filmType.type,
      }));
      return trendingMovies;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
