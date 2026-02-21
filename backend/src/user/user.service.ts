import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'prisma/generated/client/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(user: Prisma.UserCreateInput) {
    return await this.prisma.user.create({
      data: user,
    });
  }

  async searchByName({ q, limit }: SearchQueryDto) {
    const where = {
      firstName: {
        contains: q,
        mode: 'insensitive' as const,
      },
    };

    const [users, totalCount] = await Promise.all([
      this.prisma.user.findMany({
        where,
        take: limit,
        select: {
          id: true,
          firstName: true,
          avatarURL: true,
          visits: {
            select: { rating: true },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    const data = users.map((user) => {
      const visitsCount = user.visits.length;
      const ratedVisits = user.visits.filter((v) => v.rating !== null);
      const avgRating =
        ratedVisits.length > 0
          ? Math.round(
              (ratedVisits.reduce((sum, v) => sum + v.rating!, 0) /
                ratedVisits.length) *
                100,
            ) / 100
          : 0;

      return {
        id: user.id,
        avatarURL: user.avatarURL,
        name: user.firstName,
        visits: visitsCount,
        avgRating,
      };
    });

    return { data, totalCount };
  }

  async findUserSummaryById(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        avatarURL: true,
        rank: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) return null;

    const { firstName, ...rest } = user;
    return { ...rest, username: firstName };
  }

  async findUserProfileById(userId: number) {
    const [allAchievements, userProfile] = await Promise.all([
      this.prisma.achievement.findMany({
        orderBy: { id: 'asc' },
        omit: { code: true },
      }),
      this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          firstName: true,
          avatarURL: true,
          joinedAt: true,
          rank: {
            select: {
              name: true,
              color: true,
              icon: true,
            },
          },
          visits: {
            orderBy: [{ visitedAt: 'desc' }, { id: 'asc' }],
            select: {
              id: true,
              description: true,
              rating: true,
              visitedAt: true,
              timeZone: true,
              pizzeria: {
                select: {
                  id: true,
                  memberNumber: true,
                  name: true,
                  address: true,
                  nation: true,
                },
              },
            },
          },
          achievements: {
            select: {
              achievementId: true,
              unlockedAt: true,
            },
          },
        },
      }),
    ]);

    if (!userProfile) {
      throw new NotFoundException();
    }

    const unlockedAchievementsMap = new Map(
      userProfile.achievements.map((ua) => [ua.achievementId, ua.unlockedAt]),
    );

    const processedAchievements = allAchievements.map((achievement) => ({
      ...achievement,
      unlockedAt: unlockedAchievementsMap.get(achievement.id) || null,
    }));

    // processedAchievements.sort((a, b) => {
    //   if (a.unlockedAt && !b.unlockedAt) return -1;
    //   if (!a.unlockedAt && b.unlockedAt) return 1;
    //   return a.id - b.id;
    // });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { achievements, firstName, ...restOfProfile } = userProfile;

    return {
      ...restOfProfile,
      username: firstName,
      achievements: processedAchievements,
    };
  }
}
