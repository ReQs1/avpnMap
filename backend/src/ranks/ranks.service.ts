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

    /*
    can't do type assertion here for some reason (even tho I'm 100% sure there is row with that userId - JwtGuard in visits.controller.ts), that's why I have to do it that way
    */
    let currentRankId: number;
    try {
      const { rankId } = await this.prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: {
          rankId: true,
        },
      });
      currentRankId = rankId;
    } catch (error) {
      console.error(
        `Failed to retrieve current rank for user ${userId}:`,
        error,
      );
      return;
    }

    if (currentRankId === newRankId) {
      return;
    }

    try {
      await this.assignRankToUser(userId, newRankId);
    } catch (error) {
      console.error(`Failed to assign new rank to user ${userId}:`, error);
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
