import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { AgeRatingController } from "./age-rating.controller";
import { AgeRatingService } from "./age-rating.service";

@Module({
  controllers: [AgeRatingController],
  providers: [AgeRatingService, PrismaService],
})
export class AgeRatingModule {}
