import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, CookieOptions } from 'express';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { AuthRequest } from './interfaces/interfaces';
import { AuthService } from './auth.service';
import { accessTokenExpiresIn } from './constants/jwt-constants';

@Controller('auth')
export class AuthController {
  private isProd: boolean;
  private accessCookieOpts: CookieOptions;
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
      maxAge: accessTokenExpiresIn,
    };

    this.redirectURL = this.configService.get<string>('FRONTEND_URL')!;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  googleCallback(@Req() req: AuthRequest, @Res() res: Response) {
    const accessToken = this.authService.createAccessToken(req.user.id);
    // TODO: add refresh token
    res
      .cookie('accessToken', accessToken, this.accessCookieOpts)
      .redirect(this.redirectURL);
  }
}
