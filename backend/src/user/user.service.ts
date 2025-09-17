import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'prisma/generated/client/client';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async findUserSummaryById(userId: number) {
    return await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        avatarURL: true,
        rank: {
          select: {
            name: true,
          },
        },
      },
    });
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
          username: true,
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
            orderBy: {
              visitedAt: 'desc',
            },
            select: {
              id: true,
              description: true,
              rating: true,
              visitedAt: true,
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

    processedAchievements.sort((a, b) => {
      if (a.unlockedAt && !b.unlockedAt) return -1;
      if (!a.unlockedAt && b.unlockedAt) return 1;
      return a.id - b.id;
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { achievements, ...restOfProfile } = userProfile;

    return {
      ...restOfProfile,
      achievements: processedAchievements,
    };
  }
}
