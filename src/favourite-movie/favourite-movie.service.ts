import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { FavouriteMovieDto } from "./dto/favourite-movie-type.dto";

@Injectable()
export class FavouriteMovieService {
  constructor(private prisma: PrismaService) {}

  async addFavourites(dto: FavouriteMovieDto) {
    try {
      const favourites = await this.prisma.favouriteMovie.create({
        data: { movieId: dto.movieId, userId: dto.userId },
      });

      return favourites;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteFavouriteMovie(dto: FavouriteMovieDto) {
    try {
      const deletedFavourite = await this.prisma.favouriteMovie.deleteMany({
        where: {
          userId: dto.userId,
          movieId: dto.movieId,
        },
      });
      if (deletedFavourite.count === 0) {
        throw new HttpException(
          "Movie with this id doesnt exist",
          HttpStatus.NOT_FOUND
        );
      }

      return {
        message: "любимый фильм успешно удален",
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
