import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateGenreFilmDto } from "./dto/create-genre-film.dto";
import { UpdateGenreFilmDto } from "./dto/update-genre-film.dto";
import { GenreFilmService } from "./genre-film.service";

@Controller("genre-film")
export class GenreFilmController {
  constructor(private readonly genreFilmService: GenreFilmService) {}

  @Post()
  createGenre(@Body() dto: CreateGenreFilmDto) {
    return this.genreFilmService.createGenre(dto);
  }

  @Get()
  findAllGenres() {
    return this.genreFilmService.findAllGenres();
  }

  @Get("popular")
  findMostPopularGenres() {
    return this.genreFilmService.findMostPopularGenres();
  }

  @Patch(":id")
  updateGenreName(@Body() dto: UpdateGenreFilmDto, @Param("id") id: string) {
    return this.genreFilmService.updateGenreName(dto, id);
  }

  @Delete(":id")
  deleteGenre(@Param("id") id: string) {
    return this.genreFilmService.deleteGenre(id);
  }
}
