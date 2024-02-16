import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { FavouriteMovieController } from "./favourite-movie.controller";
import { FavouriteMovieService } from "./favourite-movie.service";

@Module({
  controllers: [FavouriteMovieController],
  providers: [FavouriteMovieService, PrismaService],
})
export class FavouriteMovieModule {}
