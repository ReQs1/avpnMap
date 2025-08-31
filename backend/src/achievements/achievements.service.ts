import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RanksService } from 'src/ranks/ranks.service';
import {
  ACHIEVEMENT_DEFINITIONS,
  AchievementCode,
  VisitWithPizzeria,
} from './definitions/achievements.definitions';

type UserAchievements = {
  achievement: {
    code: string;
  };
};

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

  async synchronizeAchievements(userId: number) {
    let achievementsCount: number;

    try {
      const { userVisits, userAchievements } = await this.fetchUserData(userId);
      const { shouldHaveCodes, currentAchievementCodes } =
        this.determineAchievementsCodes(userVisits, userAchievements);

      const { codesToAdd, codesToRevoke } = this.determineCodesChanges(
        shouldHaveCodes,
        currentAchievementCodes,
      );

      if (codesToAdd.length === 0 && codesToRevoke.length === 0) {
        return;
      }

      await this.updateUserAchievements(userId, codesToAdd, codesToRevoke);
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

  private async fetchUserData(userId: number) {
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
    return { userVisits, userAchievements };
  }

  private determineAchievementsCodes(
    userVisits: VisitWithPizzeria[],
    userAchievements: UserAchievements[],
  ) {
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

    return { shouldHaveCodes, currentAchievementCodes };
  }

  private determineCodesChanges(
    shouldHaveCodes: Set<AchievementCode>,
    currentAchievementCodes: Set<AchievementCode>,
  ) {
    const codesToAdd = [...shouldHaveCodes].filter(
      (code) => !currentAchievementCodes.has(code),
    );

    const codesToRevoke = [...currentAchievementCodes].filter(
      (code) => !shouldHaveCodes.has(code),
    );

    return { codesToAdd, codesToRevoke };
  }

  private async updateUserAchievements(
    userId: number,
    codesToAdd: AchievementCode[],
    codesToRevoke: AchievementCode[],
  ) {
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
  }
}
