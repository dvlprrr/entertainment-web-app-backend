import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { TrendingMoviesController } from "./trending-movies.controller";
import { TrendingMoviesService } from "./trending-movies.service";

@Module({
  controllers: [TrendingMoviesController],
  providers: [TrendingMoviesService, PrismaService],
})
export class TrendingMoviesModule {}
