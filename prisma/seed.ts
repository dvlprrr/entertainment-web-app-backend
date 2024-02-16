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
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
