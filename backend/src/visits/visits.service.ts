import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Injectable()
export class VisitsService {
  constructor(private prisma: PrismaService) {}

  async createVisit(userId: number, createVisitDto: CreateVisitDto) {
    const { visitedAt, ...rest } = createVisitDto;

    const visitDate = this.parseVisitDate(visitedAt);
    const now = new Date();

    if (visitDate > now) {
      throw new BadRequestException('Visit date cannot be in the future');
    }

    try {
      const createdVisit = await this.prisma.visit.create({
        data: {
          userId,
          ...rest,
          visitedAt: visitDate,
        },
      });
      return createdVisit;
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

      throw new InternalServerErrorException('Failed to create visit');
    }
  }

  async updateVisit(
    userId: number,
    pizzeriaId: number,
    updateVisitDto: UpdateVisitDto,
  ) {
    const { visitedAt, ...rest } = updateVisitDto;

    const updateData: any = { ...rest };

    if (visitedAt) {
      const visitDate = this.parseVisitDate(visitedAt);
      const now = new Date();

      if (visitDate > now) {
        throw new BadRequestException('Visit date cannot be in the future');
      }
      updateData.visitedAt = visitDate;
    }

    try {
      const updatedVisit = await this.prisma.visit.update({
        where: {
          userId_pizzeriaId: {
            userId,
            pizzeriaId,
          },
        },
        data: updateData,
      });
      return updatedVisit;
    } catch (error) {
      console.log(error);
      if (error?.code === 'P2025') {
        throw new NotFoundException(error.meta?.cause);
      }
      throw new InternalServerErrorException('Failed to update visit');
    }
  }

  // util function
  private parseVisitDate(dateString: string): Date {
    const [month, day, year] = dateString
      .split('/')
      .map((num) => parseInt(num, 10));
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
  }
}
