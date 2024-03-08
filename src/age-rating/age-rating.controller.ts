import { Controller, Get } from "@nestjs/common";
import { AgeRatingService } from "./age-rating.service";

@Controller("age-rating")
export class AgeRatingController {
  constructor(private readonly ageRatingService: AgeRatingService) {}

  @Get()
  getAgeRatings() {
    return this.ageRatingService.getAgeRatings();
  }
}
