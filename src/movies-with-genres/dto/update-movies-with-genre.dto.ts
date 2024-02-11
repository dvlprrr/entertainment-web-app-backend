import { PartialType } from '@nestjs/mapped-types';
import { CreateMoviesWithGenreDto } from './create-movies-with-genre.dto';

export class UpdateMoviesWithGenreDto extends PartialType(CreateMoviesWithGenreDto) {}
