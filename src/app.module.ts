import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { MoviesModule } from "./movies/movies.module";
import { RoleModule } from "./role/role.module";
import { UserModule } from "./user/user.module";
import { FilmTypeModule } from './film-type/film-type.module';

@Module({
  imports: [AuthModule, UserModule, RoleModule, MoviesModule, FilmTypeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
