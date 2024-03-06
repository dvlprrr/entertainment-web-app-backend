/*
  Warnings:

  - You are about to drop the column `ageRating` on the `Movie` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `AgeRating` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "ageRating";

-- CreateIndex
CREATE UNIQUE INDEX "AgeRating_name_key" ON "AgeRating"("name");
