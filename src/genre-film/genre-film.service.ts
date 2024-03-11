/* eslint-disable @typescript-eslint/no-var-requires */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateGenreFilmDto } from "./dto/create-genre-film.dto";
import { UpdateGenreFilmDto } from "./dto/update-genre-film.dto";

const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
});
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
      const updatedGenre = await this.prisma.genreFilm.update({
        where: { id: Number(id) },
        data: { name: dto.name },
      });
      return updatedGenre;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findMostPopularGenres() {
    try {
      const res = await knex("GenreFilm")
        .select("name")
        .join("_GenreFilmToMovie", "GenreFilm.id", "=", "_GenreFilmToMovie.A")
        .join("Movie", "Movie.id", "=", "_GenreFilmToMovie.B")
        .join("FavouriteMovie", "Movie.id", "=", "FavouriteMovie.movieId")
        .groupBy("name")
        .orderByRaw("count(name) desc")
        .limit(5);

      const genres = res.map((genre) => {
        return genre.name;
      });
      return genres;
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
