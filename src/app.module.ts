import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { DatabaseInitializerService } from "./defaultTags/defaultTags";
import { FilmTypeModule } from "./film-type/film-type.module";
import { GenreFilmModule } from "./genre-film/genre-film.module";
import { MoviesWithGenresModule } from "./movies-with-genres/movies-with-genres.module";
import { MoviesModule } from "./movies/movies.module";
import { PrismaService } from "./prisma.service";
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
    MoviesWithGenresModule,
  ],
  controllers: [],
  providers: [DatabaseInitializerService, PrismaService],
})
export class AppModule {}
