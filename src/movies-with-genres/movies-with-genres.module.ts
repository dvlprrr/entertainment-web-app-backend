import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { MoviesWithGenresController } from "./movies-with-genres.controller";
import { MoviesWithGenresService } from "./movies-with-genres.service";

@Module({
  controllers: [MoviesWithGenresController],
  providers: [MoviesWithGenresService, PrismaService],
})
export class MoviesWithGenresModule {}
