import { Body, Controller, Get, Post } from "@nestjs/common";
import { TrendingMoviesService } from "./trending-movies.service";

@Controller("trending-movies")
export class TrendingMoviesController {
  constructor(private readonly trendingMoviesService: TrendingMoviesService) {}

  @Post()
  addMovieToTrending(@Body() { movieId }: { movieId: number }) {
    return this.trendingMoviesService.addMovieToTrending({ movieId });
  }

  @Get()
  findTrendingMovies() {
    return this.trendingMoviesService.findTrendingMovies();
  }
}
