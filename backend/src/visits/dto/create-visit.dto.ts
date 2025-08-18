import { Transform } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateVisitDto {
  @IsInt({ message: 'Pizzeria ID must be a valid integer' })
  @Min(1, { message: 'Pizzeria ID must be positive' })
  pizzeriaId: number;

  @IsOptional()
  @IsInt({ message: 'Rating must be an integer' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must be at most 5' })
  rating?: number;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(500, { message: 'Description cannot exceed 500 characters' })
  @Transform(({ value }) => value?.trim())
  description?: string;

  @IsString({ message: 'Visit date must be a string' })
  @Matches(/^\d{1,2}\/\d{1,2}\/\d{4}$/, {
    message: 'Visit date must be in M/D/YYYY format',
  })
  visitedAt: string;
}
