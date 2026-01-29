import { Injectable, Logger } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class LeaderboardScheduler {
  private readonly logger = new Logger(LeaderboardScheduler.name);

  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Cron('58 23 * * *', {
    name: 'daily_leaderboard_refresh',
    timeZone: 'UTC',
  })
  async handleDailyLeaderboardRefresh() {
    this.logger.log('CRON: Starting nightly leaderboard build...');

    const buildStart = Date.now();

    try {
      await this.leaderboardService.buildNextRankings();

      const buildDuration = (Date.now() - buildStart) / 1000;
      this.logger.log(
        `CRON: Build complete in ${buildDuration}s. Waiting for midnight...`,
      );

      const now = new Date();
      const target = new Date(now);
      target.setUTCDate(target.getDate() + 1);
      target.setUTCHours(0, 0, 0, 0);

      const delay = target.getTime() - Date.now();
      if (delay > 0) {
        await new Promise((res) => setTimeout(res, delay));
      } else {
        this.logger.warn(
          `CRON: Build was late by ${Math.abs(delay)}ms. Swapping immediately.`,
        );
      }

      await this.leaderboardService.swapLeaderboards();
    } catch (error) {
      console.log(error);
    }
  }
}
