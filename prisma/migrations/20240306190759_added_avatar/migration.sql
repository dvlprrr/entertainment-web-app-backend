/*
  Warnings:

  - You are about to drop the `MovieToGenreFilm` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `GenreFilm` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_typeId_fkey";

-- DropForeignKey
ALTER TABLE "MovieToGenreFilm" DROP CONSTRAINT "MovieToGenreFilm_genreFilmId_fkey";

-- DropForeignKey
ALTER TABLE "MovieToGenreFilm" DROP CONSTRAINT "MovieToGenreFilm_movieId_fkey";

-- DropIndex
DROP INDEX "Movie_id_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT 'https://i.pngimg.me/thumb/f/720/c3f2c592f9.jpg';

-- DropTable
DROP TABLE "MovieToGenreFilm";

-- CreateTable
CREATE TABLE "FavouriteMovie" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "FavouriteMovie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GenreFilmToMovie" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FavouriteMovie_id_key" ON "FavouriteMovie"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreFilmToMovie_AB_unique" ON "_GenreFilmToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreFilmToMovie_B_index" ON "_GenreFilmToMovie"("B");

-- CreateIndex
CREATE UNIQUE INDEX "GenreFilm_name_key" ON "GenreFilm"("name");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "FilmType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteMovie" ADD CONSTRAINT "FavouriteMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavouriteMovie" ADD CONSTRAINT "FavouriteMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreFilmToMovie" ADD CONSTRAINT "_GenreFilmToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "GenreFilm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreFilmToMovie" ADD CONSTRAINT "_GenreFilmToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
