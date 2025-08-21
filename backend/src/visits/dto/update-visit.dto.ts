import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsTimeZone,
  Max,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { IsNotFutureDate } from '../decorators/is-not-future-date.decorator';

export class UpdateVisitDto {
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

  @IsOptional()
  @IsDateString()
  @IsNotFutureDate()
  visitedAt?: string;

  @ValidateIf((o) => o.visitedAt !== undefined)
  @IsString()
  @IsTimeZone({
    message: 'A valid IANA timezone must be provided when updating the date',
  })
  timeZone?: string;
}
