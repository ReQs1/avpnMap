import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import Redis from 'ioredis';
import { PrismaService } from 'src/prisma/prisma.service';
import { REDIS_CLIENT } from 'src/redis/constants/redis.constants';
import { LB_REDIS_KEYS } from './constants/leaderboards.constants';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class LeaderboardService implements OnModuleInit {
  private readonly logger = new Logger(LeaderboardService.name);
  private readonly BATCH_SIZE = 2000;

  private isProcessing = false;

  constructor(
    private prisma: PrismaService,
    @Inject(REDIS_CLIENT) private redis: Redis,
  ) {}

  async onModuleInit() {
    await this.ensureLeaderboardExists();
  }

  // Checks if the leaderboard is missing and triggers a rebuild if needed
  async ensureLeaderboardExists() {
    if (this.isProcessing) return;

    try {
      const exists = await this.redis.exists(LB_REDIS_KEYS.META);

      if (exists === 0) {
        this.logger.warn(
          'WATCHDOG: Leaderboard missing! Starting emergency repair...',
        );
        await this.forceRefresh();
        this.logger.log('WATCHDOG: Repair successful.');
      }
    } catch (error) {
      this.logger.error('WATCHDOG: Check failed', error);
    }
  }

  // Manual Trigger.
  async forceRefresh() {
    await this.buildNextRankings();
    await this.swapLeaderboards();
  }

  async buildNextRankings() {
    if (this.isProcessing) {
      this.logger.warn('Skipping build: Operation already in progress.');
      return;
    }

    this.isProcessing = true;
    this.logger.log('Started building next leaderboards...');

    try {
      await this.redis.del(
        LB_REDIS_KEYS.PIZZERIAS.NEXT,
        LB_REDIS_KEYS.USERS.NEXT,
      );

      await this.processUserBatches();
      await this.processPizzeriaBatches();
      this.logger.log('Finished building next leaderboards.');
    } catch (error) {
      this.logger.error('Failed to build leaderboards', error);
      throw error;
    } finally {
      this.isProcessing = false;
    }
  }

  async swapLeaderboards() {
    const pipeline = this.redis.pipeline();

    pipeline.rename(LB_REDIS_KEYS.USERS.NEXT, LB_REDIS_KEYS.USERS.CURRENT);
    pipeline.rename(
      LB_REDIS_KEYS.PIZZERIAS.NEXT,
      LB_REDIS_KEYS.PIZZERIAS.CURRENT,
    );

    const now = new Date();
    const nextRefresh = new Date(now);
    nextRefresh.setUTCDate(nextRefresh.getUTCDate() + 1);
    nextRefresh.setUTCHours(0, 0, 0, 0);

    pipeline.hset(LB_REDIS_KEYS.META, {
      lastRefresh: now.toISOString(),
      nextRefresh: nextRefresh.toISOString(),
    });

    await pipeline.exec();
    this.logger.log('SWAP COMPLETE: Leaderboards are live.');
  }

  private async processUserBatches() {
    let cursorId: number | undefined;
    let hasMore = true;

    while (hasMore) {
      const users = await this.prisma.user.findMany({
        take: this.BATCH_SIZE,
        skip: cursorId ? 1 : 0,
        cursor: cursorId ? { id: cursorId } : undefined,
        orderBy: { id: 'asc' },
        select: {
          id: true,
          username: true,
          avatarURL: true,
          rank: {
            select: { name: true, color: true, icon: true },
          },
          _count: {
            select: { achievements: true },
          },
          visits: {
            select: {
              rating: true,
              description: true,
            },
          },
        },
      });

      if (users.length === 0) {
        hasMore = false;
        break;
      }

      const pipeline = this.redis.pipeline();

      for (const user of users) {
        const visitsCount = user.visits.length;
        const achievementsCount = user._count.achievements;

        let textReviewsCount = 0;
        let ratingSum = 0;
        let ratedVisitsCount = 0; // Number of times user left a star rating

        for (const visit of user.visits) {
          // Check for text review (non-empty description)
          if (visit.description && visit.description.trim().length > 0) {
            textReviewsCount++;
          }
          // Check for valid rating
          if (visit.rating !== null) {
            ratingSum += visit.rating;
            ratedVisitsCount++;
          }
        }

        // Calculate Average Rating
        const rawAvgRating =
          ratedVisitsCount > 0 ? ratingSum / ratedVisitsCount : 0;
        const avgRating = Math.round(rawAvgRating * 100) / 100;

        // --- Calculate user's score ---
        // Formula:
        // +1 per Visit
        // +1 per Text Review
        // +2 per Star Rating
        // +5 per Achievement
        const score =
          visitsCount * 1 +
          textReviewsCount * 1 +
          ratedVisitsCount * 2 +
          achievementsCount * 5;

        // --- redis payload ---
        const memberData = JSON.stringify({
          userId: user.id,
          username: user.username,
          avatarURL: user.avatarURL,
          userRank: {
            name: user.rank.name,
            color: user.rank.color,
            icon: user.rank.icon,
          },
          avgRating: avgRating,
          visits: visitsCount,
          score: Math.round(score * 100) / 100,
        });

        pipeline.zadd(LB_REDIS_KEYS.USERS.NEXT, score, memberData);
      }

      await pipeline.exec();
      cursorId = users[users.length - 1].id;
      if (users.length < this.BATCH_SIZE) hasMore = false;
    }
  }

  private async processPizzeriaBatches() {
    let cursorId: number | undefined;
    let hasMore = true;

    while (hasMore) {
      const pizzerias = await this.prisma.pizzeria.findMany({
        take: this.BATCH_SIZE,
        skip: cursorId ? 1 : 0,
        cursor: cursorId ? { id: cursorId } : undefined,
        orderBy: { id: 'asc' },
        select: {
          id: true,
          name: true,
          nation: true,
          memberNumber: true,
          visits: {
            select: { rating: true },
          },
        },
      });

      if (pizzerias.length === 0) {
        hasMore = false;
        break;
      }

      const pipeline = this.redis.pipeline();

      for (const pizz of pizzerias) {
        const visitsCount = pizz.visits.length;

        let ratingSum = 0;
        let ratedVisitsCount = 0;

        for (const v of pizz.visits) {
          if (v.rating !== null) {
            ratingSum += v.rating;
            ratedVisitsCount++;
          }
        }

        const rawAvgRating =
          ratedVisitsCount > 0 ? ratingSum / ratedVisitsCount : 0;
        const avgRating = Math.round(rawAvgRating * 100) / 100;

        // --- calculate pizzeria's score ---
        // Formula: AvgRating * log10(Visits + 1) * 10
        // We use (Visits + 1) to prevent log10(0) issues
        const score = avgRating * Math.log10(visitsCount + 1) * 10;

        // --- redis payload ---
        const memberData = JSON.stringify({
          pizzeriaId: pizz.id,
          avpnId: pizz.memberNumber,
          name: pizz.name,
          nation: pizz.nation,
          avgRating: avgRating,
          visits: visitsCount,
          score: Math.round(score * 100) / 100,
        });

        pipeline.zadd(LB_REDIS_KEYS.PIZZERIAS.NEXT, score, memberData);
      }

      await pipeline.exec();
      cursorId = pizzerias[pizzerias.length - 1].id;
      if (pizzerias.length < this.BATCH_SIZE) hasMore = false;
    }
  }

  async getUsersLeaderboard(query: PaginationDto) {
    const { limit, page } = query;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit - 1;

    try {
      const pipeline = this.redis.pipeline();
      pipeline.zrevrange(LB_REDIS_KEYS.USERS.CURRENT, startIndex, endIndex);
      pipeline.zcard(LB_REDIS_KEYS.USERS.CURRENT);
      pipeline.hgetall(LB_REDIS_KEYS.META);

      const results = await pipeline.exec();

      if (!results) {
        throw new Error('Pipeline execution returned null');
      }

      const rawUsersData = results[0][1] as string[];
      const totalCount = results[1][1] as number;
      const metaData = results[2][1] as Record<string, string>;

      const data = rawUsersData.map((user, idx) => {
        const parsed = JSON.parse(user);

        return {
          position: startIndex + idx + 1,
          ...parsed,
        };
      });

      return {
        data,
        meta: {
          totalCount,
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
          ...metaData,
        },
      };
    } catch (error) {
      this.logger.error('Failed to fetch users leaderboard', error);
      throw new InternalServerErrorException(
        'Failed to fetch users leaderboard',
      );
    }
  }

  async getPizzeriasLeaderboard(query: PaginationDto) {
    const { limit, page } = query;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit - 1;

    try {
      const pipeline = this.redis.pipeline();
      pipeline.zrevrange(LB_REDIS_KEYS.PIZZERIAS.CURRENT, startIndex, endIndex);
      pipeline.zcard(LB_REDIS_KEYS.PIZZERIAS.CURRENT);
      pipeline.hgetall(LB_REDIS_KEYS.META);

      const results = await pipeline.exec();

      if (!results) {
        throw new Error('Pipeline execution returned null');
      }

      const rawPizzeriasData = results[0][1] as string[];
      const totalCount = results[1][1] as number;
      const metaData = results[2][1] as Record<string, string>;

      const data = rawPizzeriasData.map((pizzeria, idx) => {
        const parsed = JSON.parse(pizzeria);

        return {
          position: startIndex + idx + 1,
          ...parsed,
        };
      });

      return {
        data,
        meta: {
          totalCount,
          page,
          limit,
          totalPages: Math.ceil(totalCount / limit),
          ...metaData,
        },
      };
    } catch (error) {
      this.logger.error('Failed to fetch pizzerias leaderboard', error);
      throw new InternalServerErrorException(
        'Failed to fetch pizzerias leaderboard',
      );
    }
  }
}
