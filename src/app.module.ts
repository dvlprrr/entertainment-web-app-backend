import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { FilmTypeModule } from "./film-type/film-type.module";
import { GenreFilmModule } from "./genre-film/genre-film.module";
import { MoviesModule } from "./movies/movies.module";
import { RoleModule } from "./role/role.module";
import { UserModule } from "./user/user.module";
import { FavouriteMovieModule } from './favourite-movie/favourite-movie.module';
import { AgeRatingModule } from './age-rating/age-rating.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    MoviesModule,
    FilmTypeModule,
    GenreFilmModule,
    FavouriteMovieModule,
    AgeRatingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
