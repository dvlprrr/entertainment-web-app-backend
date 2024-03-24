import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function seedFilmTypes() {
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
