import { Controller, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/redis/constants/redis.constants';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(@Inject(REDIS_CLIENT) private redis: Redis) {}
}
