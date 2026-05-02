import { IsString, IsOptional, IsNumber, IsArray, IsBoolean } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsString()
  description?: string;

   @IsOptional()
  @IsString()
  authorBio?: string;

  @IsOptional()
  @IsString()
  storyOutline?: string;

  @IsOptional()
  @IsArray()
  genres?: string[];

  @IsOptional()
  @IsNumber()
  publishedYear?: number;

  @IsOptional()
  @IsString()
  isbn?: string;
}

export class SuggestBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  authorBio?: string;

  @IsOptional()
  @IsString()
  storyOutline?: string;
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsBoolean()
  isPopular?: boolean;

  @IsOptional()
  @IsBoolean()
  isTopRated?: boolean;

  @IsOptional()
  @IsString()
  authorBio?: string;

  @IsOptional()
  @IsString()
  storyOutline?: string;
}
