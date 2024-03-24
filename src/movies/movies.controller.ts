import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
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
  findAllMovies(@Query("search") filterValue: string) {
    return this.moviesService.findAllMovies(filterValue);
  }

  @Get("tv-series")
  findTvSeries(@Query("search") filterValue: string) {
    return this.moviesService.findTvSeries(filterValue);
  }

  @Get("movies")
  findMovies(@Query("search") filterValue: string) {
    return this.moviesService.findMovies(filterValue);
  }

  @Delete(":id")
  deleteMovieById(@Param() id: { id: string }) {
    return this.moviesService.deleteMovieById(id);
  }
}
