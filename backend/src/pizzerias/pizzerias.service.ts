import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PizzeriasService {
  constructor(private prisma: PrismaService) {}

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
      };
    });
  }
}
