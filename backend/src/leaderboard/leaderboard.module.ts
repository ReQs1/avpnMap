import { Module } from '@nestjs/common';
import { LeaderboardController } from './leaderboard.controller';
import { LeaderboardService } from './leaderboard.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
  imports: [PrismaModule, RedisModule],
})
export class LeaderboardModule {}
