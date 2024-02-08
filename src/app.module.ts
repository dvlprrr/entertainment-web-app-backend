import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { RoleModule } from "./role/role.module";
import { UserModule } from "./user/user.module";
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [AuthModule, UserModule, RoleModule, MoviesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
