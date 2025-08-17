import {
  IsInt,
  IsOptional,
  IsString,
  Min,
  Max,
  IsDateString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

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

  @IsDateString({}, { message: 'Visit date must be a valid ISO date string' })
  visitedAt: string; // Use string for ISO date input, convert in service
}
