import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { GenreFilmController } from "./genre-film.controller";
import { GenreFilmService } from "./genre-film.service";

@Module({
  controllers: [GenreFilmController],
  providers: [GenreFilmService, PrismaService],
})
export class GenreFilmModule {}
