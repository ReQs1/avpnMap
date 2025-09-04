import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ORDERED_RANKS_DESC, RankCode } from './ranks.definitions';

@Injectable()
export class RanksService implements OnModuleInit {
  private ranksCache = new Map<RankCode, number>();

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const ranks = await this.prisma.rank.findMany({
      select: {
        id: true,
        code: true,
      },
    });
    for (const rank of ranks) {
      this.ranksCache.set(rank.code as RankCode, rank.id);
    }
    console.log('RanksService has been initialized');
  }

  async syncUserRank(userId: number, achievementCount: number) {
    const newRankCode = this.getRankByAchievementCount(achievementCount);
    const newRankId = this.ranksCache.get(newRankCode);

    if (!newRankId) {
      throw new BadRequestException(
        `Rank ID not found for code: ${newRankCode}`,
      );
    }

    try {
      const { rankId: currentRankId } =
        await this.prisma.user.findUniqueOrThrow({
          where: { id: userId },
          select: {
            rankId: true,
          },
        });

      if (currentRankId === newRankId) return;

      await this.assignRankToUser(userId, newRankId);
    } catch (error) {
      console.error(`Failed to sync rank for user ${userId}:`, error);
    }
  }

  private getRankByAchievementCount(achievementCount: number): RankCode {
    for (const rank of ORDERED_RANKS_DESC) {
      if (achievementCount >= rank.minAchievements) {
        if (!rank.maxAchievements || achievementCount <= rank.maxAchievements) {
          return rank.code;
        }
      }
    }

    return ORDERED_RANKS_DESC[ORDERED_RANKS_DESC.length - 1].code; // defaults to lowest rank
  }

  private async assignRankToUser(userId: number, newRankId: number) {
    await this.prisma.user.update({
      data: { rankId: newRankId },
      where: {
        id: userId,
      },
    });
  }
}
