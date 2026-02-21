import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class PizzeriasService {
  constructor(private prisma: PrismaService) {}

  async searchByName({ q, limit }: SearchQueryDto) {
    const where = {
      name: {
        contains: q,
        mode: 'insensitive' as const,
      },
    };

    const [data, totalCount] = await Promise.all([
      this.prisma.pizzeria.findMany({
        where,
        take: limit,
        select: {
          id: true,
          name: true,
          memberNumber: true,
          nation: true,
        },
      }),
      this.prisma.pizzeria.count({ where }),
    ]);

    return { data, totalCount };
  }

  async getPizzerias() {
    return await this.prisma.pizzeria.findMany();
  }

  async getPizzeriasWithUser(userId: number) {
    const rows = await this.prisma.pizzeria.findMany({
      include: {
        visits: {
          where: { userId },
          take: 1,
          select: {
            rating: true,
            description: true,
            visitedAt: true,
            timeZone: true,
          },
        },
      },
    });

    return rows.map((p) => {
      const visit = p.visits[0];

      return {
        id: p.id,
        memberNumber: p.memberNumber,
        name: p.name,
        nation: p.nation,
        address: p.address,
        lat: p.lat,
        lng: p.lng,
        website: p.website,

        rating: visit?.rating ?? null,
        description: visit?.description || null,
        visitedAt: visit?.visitedAt ?? null,
        timeZone: visit?.timeZone ?? null,
      };
    });
  }
}
