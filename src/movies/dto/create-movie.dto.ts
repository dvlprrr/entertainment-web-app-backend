export interface CreateMovieDto {
  title: string;
  url: string;
  year: number;
  typeId: number;
  ageRating: string;
  genre: number[];
}
