import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';
import { JwtPayloadRequest } from 'src/auth/interfaces/interfaces';
import { SearchQueryDto } from './dto/search-query.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('search')
  async searchUsers(@Query() query: SearchQueryDto) {
    return await this.userService.searchByName(query);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@Req() req: JwtPayloadRequest) {
    const userId = req.user.sub;
    return await this.userService.findUserSummaryById(userId);
  }

  @Get(':userId')
  async getUserProfile(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findUserProfileById(userId);
  }
}
