import { Body, Controller, Delete, Post } from "@nestjs/common";
import { FavouriteMovieDto } from "./dto/favourite-movie-type.dto";
import { FavouriteMovieService } from "./favourite-movie.service";

@Controller("favourite-movie")
export class FavouriteMovieController {
  constructor(private readonly favouriteMovieService: FavouriteMovieService) {}

  @Post()
  addFavourites(@Body() dto: FavouriteMovieDto) {
    return this.favouriteMovieService.addFavourites(dto);
  }

  @Delete()
  deleteFavourite(@Body() dto: FavouriteMovieDto) {
    return this.favouriteMovieService.deleteFavouriteMovie(dto);
  }
}
