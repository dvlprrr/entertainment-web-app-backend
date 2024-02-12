import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.genreFilm.upsert({
    where: { name: "Action" }, // Проверяем, существует ли уже жанр "Action"
    update: {}, // Если жанр уже существует, обновляем его (не требуется в этом примере)
    create: { name: "Action" }, // Если жанр не существует, создаем новый
  });

  await prisma.genreFilm.upsert({
    where: { name: "Comedy" },
    update: {},
    create: { name: "Comedy" },
  });
  await prisma.genreFilm.upsert({
    where: { name: "Drama" }, // Проверяем, существует ли уже жанр "Action"
    update: {}, // Если жанр уже существует, обновляем его (не требуется в этом примере)
    create: { name: "Drama" }, // Если жанр не существует, создаем новый
  });

  await prisma.genreFilm.upsert({
    where: { name: "Fantasy" },
    update: {},
    create: { name: "Fantasy" },
  });
  await prisma.genreFilm.upsert({
    where: { name: "Horror" }, // Проверяем, существует ли уже жанр "Action"
    update: {}, // Если жанр уже существует, обновляем его (не требуется в этом примере)
    create: { name: "Horror" }, // Если жанр не существует, создаем новый
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
