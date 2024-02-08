/*
  Warnings:

  - You are about to drop the column `typeid` on the `Movie` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[type]` on the table `FilmType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `typeId` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_typeid_fkey";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "typeid",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FilmType_type_key" ON "FilmType"("type");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "FilmType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
