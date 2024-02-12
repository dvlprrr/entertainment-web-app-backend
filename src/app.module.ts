import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { FilmTypeModule } from "./film-type/film-type.module";
import { GenreFilmModule } from "./genre-film/genre-film.module";
import { MoviesModule } from "./movies/movies.module";
import { RoleModule } from "./role/role.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    MoviesModule,
    FilmTypeModule,
    GenreFilmModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
