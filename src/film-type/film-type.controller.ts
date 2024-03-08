import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { FilmTypeService } from "./film-type.service";

@Controller("film-type")
export class FilmTypeController {
  constructor(private readonly filmTypeService: FilmTypeService) {}

  @Post()
  createFilmType(@Body() dto: { type: string }) {
    return this.filmTypeService.createFilmType(dto);
  }

  @Get()
  findAllTypes() {
    return this.filmTypeService.findAllTypes();
  }

  @Patch(":id")
  updateType(@Body() dto: { type: string }, @Param("id") id: string) {
    return this.filmTypeService.updateType(dto, id);
  }

  @Delete(":id")
  deleteType(@Param("id") id: string) {
    return this.filmTypeService.deleteType(id);
  }
}
