import { Controller, Get, Query } from '@nestjs/common';
import { PaginationDto } from './dto/pagination.dto';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get('users')
  async getUsersLeaderboard(@Query() query: PaginationDto) {
    return await this.leaderboardService.getUsersLeaderboard(query);
  }

  @Get('pizzerias')
  async getPizzeriasLeaderboard(@Query() query: PaginationDto) {
    return await this.leaderboardService.getPizzeriasLeaderboard(query);
  }
}
