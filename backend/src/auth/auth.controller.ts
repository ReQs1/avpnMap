import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CookieOptions, Response } from 'express';
import { AuthService } from './auth.service';
import {
  ACCESS_TOKEN_EXPIRES_IN_MS,
  REFRESH_TOKEN_EXPIRES_IN_MS,
} from './constants/jwt-constants';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token/refresh-token.guard';
import { AuthRequest, JwtPayloadRequest } from './interfaces/interfaces';

@Controller('auth')
export class AuthController {
  private isProd: boolean;
  private accessCookieOpts: CookieOptions;
  private refreshCookieOpts: CookieOptions;
  private redirectURL: string;

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    this.isProd = this.configService.get<string>('NODE_ENV') === 'production';

    this.accessCookieOpts = {
      httpOnly: true,
      secure: this.isProd,
      sameSite: this.isProd ? 'none' : 'lax',
      maxAge: ACCESS_TOKEN_EXPIRES_IN_MS,
    };

    this.refreshCookieOpts = {
      httpOnly: true,
      secure: this.isProd,
      sameSite: this.isProd ? 'none' : 'lax',
      maxAge: REFRESH_TOKEN_EXPIRES_IN_MS,
    };

    this.redirectURL = this.configService.get<string>('FRONTEND_URL')!;
  }

  @HttpCode(200)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken').clearCookie('refreshToken');
    return { message: 'Logged out successfully' };
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(200)
  @Post('refresh')
  refreshToken(
    @Req() req: JwtPayloadRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = req.user.sub;

    const newAccessToken = this.authService.createJwtToken(userId, 'access');
    const newRefreshToken = this.authService.createJwtToken(userId, 'refresh');

    res
      .cookie('accessToken', newAccessToken, this.accessCookieOpts)
      .cookie('refreshToken', newRefreshToken, this.refreshCookieOpts);
    return { message: 'Tokens refreshed successfully' };
  }

  // google oauth endpoints

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleCallback(@Req() req: AuthRequest, @Res() res: Response) {
    const accessToken = this.authService.createJwtToken(req.user.id, 'access');
    const refreshToken = this.authService.createJwtToken(
      req.user.id,
      'refresh',
    );

    res
      .cookie('accessToken', accessToken, this.accessCookieOpts)
      .cookie('refreshToken', refreshToken, this.refreshCookieOpts)
      .redirect(this.redirectURL);
  }
}
