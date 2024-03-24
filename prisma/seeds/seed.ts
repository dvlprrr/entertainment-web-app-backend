import { PrismaClient } from "@prisma/client";
import seedAgeRatings from "./ageRatingsSeed";
import seedFilmTypes from "./filmTypesSeed";
import seedGenres from "./genresSeed";
import seedRoles from "./rolesSeed";
const prisma = new PrismaClient();

async function seed() {
  seedGenres();
  seedRoles();
  seedFilmTypes();
  seedAgeRatings();
}
``;
seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
