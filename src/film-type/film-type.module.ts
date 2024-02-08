import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { FilmTypeController } from "./film-type.controller";
import { FilmTypeService } from "./film-type.service";

@Module({
  controllers: [FilmTypeController],
  providers: [FilmTypeService, PrismaService],
})
export class FilmTypeModule {}
