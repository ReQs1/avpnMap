import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateVisitDto } from './create-visit.dto';

export class UpdateVisitDto extends PartialType(
  PickType(CreateVisitDto, ['visitedAt', 'rating', 'description']),
) {}
