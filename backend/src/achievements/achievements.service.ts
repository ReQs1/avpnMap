import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ACHIEVEMENT_DEFINITIONS,
  AchievementCode,
} from './definitions/achievements.definitions';

@Injectable()
export class AchievementsService implements OnModuleInit {
  private allAchievements = new Map<string, number>();

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const allAchievements = await this.prisma.achievement.findMany({
      select: {
        id: true,
        code: true,
      },
    });

    for (const achievement of allAchievements) {
      this.allAchievements.set(achievement.code, achievement.id);
    }

    console.log('AchievementsService has been initialized.');
  }

  async synchronizeAchievements(userId: number) {
    try {
      // TODO add redis for caching user achievements & visits
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
        .map((code) => this.allAchievements.get(code))
        .filter((id) => id !== undefined)
        .map((id) => ({ userId, achievementId: id }));

      const idsToRevoke = codesToRevoke
        .map((code) => this.allAchievements.get(code))
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
    } catch (error) {
      console.error(
        `Failed to synchronize achievements for user ${userId}:`,
        error,
      );
    }
  }
}
