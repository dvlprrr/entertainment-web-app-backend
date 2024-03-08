import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AgeRatingService {
  constructor(private readonly prisma: PrismaService) {}

  async getAgeRatings() {
    try {
      const ageRatings = this.prisma.ageRating.findMany();

      return ageRatings;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
