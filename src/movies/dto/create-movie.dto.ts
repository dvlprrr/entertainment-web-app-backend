export interface CreateMovieDto {
  title: string;
  url: string;
  year: number;
  typeId: number;
  ageRatingId: number;
  genre: number[];
}
