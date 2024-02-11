import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateMovieDto } from "src/movies/dto/create-movie.dto";
import { MoviesWithGenresService } from "./movies-with-genres.service";

@Controller("movies-with-genres")
export class MoviesWithGenresController {
  constructor(
    private readonly moviesWithGenresService: MoviesWithGenresService
  ) {}
  @Post()
  createMovieWithGenres(@Body() dto: CreateMovieDto) {
    return this.moviesWithGenresService.createMovieAndGenre(dto);
  }

  @Get()
  getMoviesWithGenres() {
    return this.moviesWithGenresService.getMoviesAndGenres();
  }
}
