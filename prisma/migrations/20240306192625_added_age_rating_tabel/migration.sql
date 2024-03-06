/*
  Warnings:

  - Added the required column `ageRatingId` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "ageRatingId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AgeRating" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AgeRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AgeRating_id_key" ON "AgeRating"("id");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_ageRatingId_fkey" FOREIGN KEY ("ageRatingId") REFERENCES "AgeRating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
