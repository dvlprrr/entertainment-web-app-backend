import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateMovieDto } from "src/movies/dto/create-movie.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class MoviesWithGenresService {
  constructor(private readonly prisma: PrismaService) {}

  async createMovieAndGenre(movieDto: CreateMovieDto) {
    const genreIds = movieDto.genre.map((genre) => ({ id: genre.id }));
    const movieWithGenre = await this.prisma.movie.create({
      data: {
        ageRating: movieDto.ageRating,
        title: movieDto.title,
        url: movieDto.url,
        year: movieDto.year,
        typeId: movieDto.typeId,
        genreFilm: {
          connect: genreIds,
        },
      },
    });

    return movieWithGenre;
  }

  async getMoviesAndGenres() {
    try {
      const moviesAndGenres = await this.prisma.movie.findMany({
        include: {
          genreFilm: true,
        },
      });
      return moviesAndGenres;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
