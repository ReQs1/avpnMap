import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { AchievementsService } from 'src/achievements/achievements.service';

@Injectable()
export class VisitsService {
  constructor(
    private prisma: PrismaService,
    private achievementsService: AchievementsService,
  ) {}

  async createVisit(userId: number, createVisitDto: CreateVisitDto) {
    const { visitedAt, ...rest } = createVisitDto;

    const updateData: {
      visitedAt: Date;
      timeZone: string;
      description?: string;
      rating?: number;
      pizzeriaId: number;
    } = { visitedAt: new Date(visitedAt), ...rest };

    try {
      const createdVisit = await this.prisma.visit.create({
        data: {
          userId,
          ...updateData,
        },
      });

      await this.achievementsService.synchronizeAchievements(userId);
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

    const updateData: {
      visitedAt?: Date;
      timeZone?: string;
      description?: string;
      rating?: number;
    } = { ...rest };

    if (visitedAt) {
      updateData.visitedAt = new Date(visitedAt);
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

      await this.achievementsService.synchronizeAchievements(userId);
      return updatedVisit;
    } catch (error) {
      if (error?.code === 'P2025') {
        throw new NotFoundException(error.meta?.cause);
      }
      throw new InternalServerErrorException('Failed to update visit');
    }
  }

  async deleteVisit(userId: number, pizzeriaId: number) {
    try {
      const deletedVisit = await this.prisma.visit.delete({
        where: {
          userId_pizzeriaId: {
            userId,
            pizzeriaId,
          },
        },
      });

      await this.achievementsService.synchronizeAchievements(userId);
      return deletedVisit;
    } catch (error) {
      if (error?.code === 'P2025') {
        throw new NotFoundException(error.meta?.cause);
      }
      throw new InternalServerErrorException('Failed to delete visit');
    }
  }
}
