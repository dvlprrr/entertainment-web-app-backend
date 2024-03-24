import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function seedRoles() {
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
}
