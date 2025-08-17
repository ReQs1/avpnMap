import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVisitDto } from './dto/create-visit.dto';

@Injectable()
export class VisitsService {
  constructor(private prisma: PrismaService) {}

  async createVisit(userId: number, createVisitDto: CreateVisitDto) {
    const visitDate = new Date(createVisitDto.visitedAt);
    const now = new Date();

    if (visitDate > now) {
      throw new BadRequestException('Visit date cannot be in the future');
    }

    try {
      await this.prisma.visit.create({
        data: {
          userId,
          ...createVisitDto,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          'Visit already exists for this user and pizzeria',
        );
      }

      if (error.code === 'P2003') {
        if (error.meta?.constraint === 'Visit_pizzeria_id_fkey') {
          throw new NotFoundException(
            `Pizzeria with ID ${createVisitDto.pizzeriaId} not found`,
          );
        }
      }
    }
  }
}
