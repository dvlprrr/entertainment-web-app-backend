import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.genreFilm.upsert({
    where: { name: "Action" },
    update: {},
    create: { name: "Action" },
  });
  await prisma.genreFilm.upsert({
    where: { name: "Comedy" },
    update: {},
    create: { name: "Comedy" },
  });
  await prisma.genreFilm.upsert({
    where: { name: "Drama" },
    update: {},
    create: { name: "Drama" },
  });

  await prisma.genreFilm.upsert({
    where: { name: "Fantasy" },
    update: {},
    create: { name: "Fantasy" },
  });
  await prisma.genreFilm.upsert({
    where: { name: "Horror" },
    update: {},
    create: { name: "Horror" },
  });
  await prisma.genreFilm.upsert({
    where: { name: "Mystery" },
    update: {},
    create: { name: "Mystery" },
  });
  await prisma.genreFilm.upsert({
    where: { name: "Romance" },
    update: {},
    create: { name: "Romance" },
  });
  await prisma.genreFilm.upsert({
    where: { name: "Thriller" },
    update: {},
    create: { name: "Thriller" },
  });
  await prisma.genreFilm.upsert({
    where: { name: "Western" },
    update: {},
    create: { name: "Western" },
  });

  await prisma.role.upsert({
    where: { name: "User" },
    update: {},
    create: { name: "User" },
  });
  await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: { name: "Admin" },
  });

  await prisma.filmType.upsert({
    where: { type: "Movie" },
    update: {},
    create: { type: "Movie" },
  });
  await prisma.filmType.upsert({
    where: { type: "TV Series" },
    update: {},
    create: { type: "TV Series" },
  });
  await prisma.ageRating.upsert({
    where: { name: "G" },
    update: {},
    create: { name: "G" },
  });
  await prisma.ageRating.upsert({
    where: { name: "PG" },
    update: {},
    create: { name: "PG" },
  });
  await prisma.ageRating.upsert({
    where: { name: "PG-13" },
    update: {},
    create: { name: "PG-13" },
  });
  await prisma.ageRating.upsert({
    where: { name: "R" },
    update: {},
    create: { name: "R" },
  });
  await prisma.ageRating.upsert({
    where: { name: "NC-17" },
    update: {},
    create: { name: "NC-17" },
  });
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
