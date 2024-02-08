-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roleId" SET DEFAULT 1;

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "typeid" INTEGER NOT NULL,
    "ageRating" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenreFilm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GenreFilm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilmType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "FilmType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieToGenreFilm" (
    "movieId" INTEGER NOT NULL,
    "genreFilmId" INTEGER NOT NULL,

    CONSTRAINT "MovieToGenreFilm_pkey" PRIMARY KEY ("movieId","genreFilmId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_id_key" ON "Movie"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GenreFilm_id_key" ON "GenreFilm"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FilmType_id_key" ON "FilmType"("id");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_typeid_fkey" FOREIGN KEY ("typeid") REFERENCES "FilmType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieToGenreFilm" ADD CONSTRAINT "MovieToGenreFilm_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieToGenreFilm" ADD CONSTRAINT "MovieToGenreFilm_genreFilmId_fkey" FOREIGN KEY ("genreFilmId") REFERENCES "GenreFilm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
