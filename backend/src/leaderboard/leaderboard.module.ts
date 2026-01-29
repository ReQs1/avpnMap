import { Module } from '@nestjs/common';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RedisModule } from 'src/redis/redis.module';
import { LeaderboardScheduler } from './leaderboard.scheduler';

@Module({
  controllers: [LeaderboardController],
  providers: [LeaderboardService, LeaderboardScheduler],
  imports: [PrismaModule, RedisModule],
})
export class LeaderboardModule {}
