import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RanksService } from 'src/ranks/ranks.service';
import {
  ACHIEVEMENT_DEFINITIONS,
  AchievementCode,
} from './definitions/achievements.definitions';

@Injectable()
export class AchievementsService implements OnModuleInit {
  private allAchievementsCache = new Map<string, number>();

  constructor(
    private prisma: PrismaService,
    private ranksService: RanksService,
  ) {}

  async onModuleInit() {
    const allAchievementsCache = await this.prisma.achievement.findMany({
      select: {
        id: true,
        code: true,
      },
    });

    for (const achievement of allAchievementsCache) {
      this.allAchievementsCache.set(achievement.code, achievement.id);
    }

    console.log('AchievementsService has been initialized.');
  }

  // TODO: clean up synchronizeAchievements function to smaller functions
  async synchronizeAchievements(userId: number) {
    let achievementsCount: number;
    try {
      const [userVisits, userAchievements] = await Promise.all([
        this.prisma.visit.findMany({
          where: { userId },
          include: {
            pizzeria: true,
          },
        }),
        this.prisma.userAchievement.findMany({
          where: { userId },
          select: {
            achievement: { select: { code: true } },
          },
        }),
      ]);

      const shouldHaveCodes = new Set<AchievementCode>(
        (Object.keys(ACHIEVEMENT_DEFINITIONS) as AchievementCode[]).filter(
          (code) => ACHIEVEMENT_DEFINITIONS[code].check(userVisits),
        ),
      );

      const currentAchievementCodes = new Set<AchievementCode>(
        userAchievements.map(
          (entry) => entry.achievement.code as AchievementCode,
        ),
      );

      const codesToAdd = [...shouldHaveCodes].filter(
        (code) => !currentAchievementCodes.has(code),
      );

      const codesToRevoke = [...currentAchievementCodes].filter(
        (code) => !shouldHaveCodes.has(code),
      );

      if (codesToAdd.length === 0 && codesToRevoke.length === 0) {
        return;
      }

      const rowsToAdd = codesToAdd
        .map((code) => this.allAchievementsCache.get(code))
        .filter((id) => id !== undefined)
        .map((id) => ({ userId, achievementId: id }));

      const idsToRevoke = codesToRevoke
        .map((code) => this.allAchievementsCache.get(code))
        .filter((id) => id !== undefined);

      await this.prisma.$transaction(async (tx) => {
        if (rowsToAdd.length > 0) {
          await tx.userAchievement.createMany({
            data: rowsToAdd,
          });
        }
        if (idsToRevoke.length > 0) {
          await tx.userAchievement.deleteMany({
            where: {
              userId,
              achievementId: {
                in: idsToRevoke,
              },
            },
          });
        }
      });
      achievementsCount = shouldHaveCodes.size;
    } catch (error) {
      console.error(
        `Failed to synchronize achievements for user ${userId}:`,
        error,
      );
      return;
    }
    await this.ranksService.syncUserRank(userId, achievementsCount);
  }
}
