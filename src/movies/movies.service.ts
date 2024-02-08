import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateMovieDto } from "./dto/create-movie.dto";

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}

  async createMovieCard(dto: CreateMovieDto) {
    const card = await this.prisma.movie.create({
      data: {
        title: dto.title,
        url: dto.url,
        year: dto.year,
        typeId: dto.typeId,
        ageRating: dto.ageRating,
      },
    });
    return card;
  }

  async findAllMovies() {
    try {
      const movies = await this.prisma.movie.findMany();

      return movies;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
