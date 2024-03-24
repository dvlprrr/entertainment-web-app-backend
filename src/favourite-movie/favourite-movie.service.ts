import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { groupBy } from "lodash";
import { PrismaService } from "src/prisma.service";
@Injectable()
export class FavouriteMovieService {
  constructor(private prisma: PrismaService) {}

  async addFavourites(movieId: number, userId: number) {
    try {
      const isFavouritesListExistItem =
        await this.prisma.favouriteMovie.findFirst({
          where: {
            movieId,
            userId,
          },
        });

      if (isFavouritesListExistItem) {
        try {
          await this.prisma.favouriteMovie.deleteMany({
            where: {
              userId,
              movieId,
            },
          });
          return {
            message: "Вы успешно удалили фильм из избранного",
          };
        } catch (error) {
          throw new HttpException(
            `Failed to delete favourite: ${error.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        }
      } else {
        try {
          await this.prisma.favouriteMovie.create({
            data: { movieId, userId },
          });
          return {
            message: "Вы успешно добавили фильм в избранное",
          };
        } catch (error) {
          throw new HttpException(
            `Failed to add to favourites: ${error.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        }
      }
    } catch (error) {
      throw new HttpException(
        `Failed to check existence in favourites: ${error.message}`,
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async getFavouritesByUserId(id: number, filterValue: string) {
    try {
      const favourites = await this.prisma.favouriteMovie.findMany({
        where: {
          AND: [
            { userId: id },
            { movie: { title: { contains: filterValue } } },
          ],
        },
        select: {
          movie: {
            include: {
              AgeRating: { select: { name: true } },
              filmType: { select: { type: true } },
              genreFilm: { select: { name: true } },
            },
          },
        },
      });
      const res = {
        favourites_movies: groupBy(
          favourites.map(({ movie }) => ({
            id: movie.id,
            url: movie.url,
            title: movie.title,
            year: movie.year,
            ageRating: movie.AgeRating.name,
            filmType: movie.filmType.type,
            genres: movie.genreFilm.map((genre) => {
              return genre.name;
            }),
          })),
          "filmType"
        ),
      };

      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findMostPopularMovie() {
    try {
      const movie = await this.prisma.movie.findMany({
        take: 1,
        orderBy: [{ favoriteMovie: { _count: "desc" } }],
        select: {
          id: true,
          title: true,
          url: true,
          year: true,
          filmType: { select: { type: true } },
          AgeRating: { select: { name: true } },
          genreFilm: { select: { name: true } },
          _count: true,
        },
      });

      const res = movie.map((item) => {
        return {
          id: item.id,
          title: item.title,
          url: item.url,
          year: item.year,
          filmType: item.filmType.type,
          ageRating: item.AgeRating.name,
          genres: item.genreFilm.map((item) => {
            return item.name;
          }),
          count: item._count,
        };
      })[0];
      return res;
    } catch (error) {}
  }

  async deleteFavouriteMovie(dto: { movieId: number }, userId: number) {
    try {
      const deletedFavourite = await this.prisma.favouriteMovie.deleteMany({
        where: {
          userId,
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
