import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";

import { FavouriteMovieService } from "./favourite-movie.service";

@Controller("favourite-movie")
export class FavouriteMovieController {
  constructor(private readonly favouriteMovieService: FavouriteMovieService) {}

  @UseGuards(AuthGuard)
  @Post()
  addFavourites(@Body() dto: { movieId: number }, @Req() req) {
    const { id } = req.user;

    return this.favouriteMovieService.addFavourites(dto.movieId, id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  deleteFavourite(@Body() dto: { movieId: number }, @Req() req) {
    const { id } = req.user;
    return this.favouriteMovieService.deleteFavouriteMovie(dto, id);
  }

  @UseGuards(AuthGuard)
  @Get()
  getFavouritesByUserId(@Req() req, @Query("search") filterValue: string) {
    const { id } = req.user;
    return this.favouriteMovieService.getFavouritesByUserId(id, filterValue);
  }

  @Get("popular-movie")
  getMostPopularMovie() {
    return this.favouriteMovieService.findMostPopularMovie();
  }
}
