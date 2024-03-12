import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  createCard(@Body() dto: CreateMovieDto) {
    return this.moviesService.createMovieCard(dto);
  }

  @Get()
  findAllMovies() {
    return this.moviesService.findAllMovies();
  }

  @Delete(":id")
  deleteMovieById(@Param() id: { id: string }) {
    return this.moviesService.deleteMovieById(id);
  }
}
