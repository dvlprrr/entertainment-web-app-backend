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
import { FavouriteMovieDto } from "./dto/favourite-movie-type.dto";
import { FavouriteMovieService } from "./favourite-movie.service";

@Controller("favourite-movie")
@UseGuards(AuthGuard)
export class FavouriteMovieController {
  constructor(private readonly favouriteMovieService: FavouriteMovieService) {}

  @Post()
  addFavourites(@Body() dto: FavouriteMovieDto, @Req() req) {
    const { id } = req.user;

    return this.favouriteMovieService.addFavourites(dto.movieId, id);
  }

  @Delete()
  deleteFavourite(@Body() movieId: FavouriteMovieDto, @Req() req) {
    const { id } = req.user;
    return this.favouriteMovieService.deleteFavouriteMovie(movieId, id);
  }

  @Get()
  getFavouritesByUserId(@Req() req, @Query("search") filterValue: string) {
    const { id } = req.user;
    return this.favouriteMovieService.getFavouritesByUserId(id, filterValue);
  }
}
