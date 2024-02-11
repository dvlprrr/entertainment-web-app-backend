import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class DatabaseInitializerService {
  constructor(private readonly prismaService: PrismaService) {}

  async initialize() {
    const existingGenres = await this.prismaService.genreFilm.findMany();
    if (existingGenres.length === 0) {
      const defaultGenres = [
        "Action",
        "Comedy",
        "Drama",
        "Fantasy",
        "Horror",
        "Mystery",
        "Romance",
        "Thriller",
        "Western",
      ];
      for (const genreName of defaultGenres) {
        await this.prismaService.genreFilm.create({
          data: {
            name: genreName,
          },
        });
      }
    }
  }
}
