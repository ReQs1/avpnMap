import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
import { ConfigType } from '@nestjs/config';
import { accessTokenExpiresIn } from './constants/jwt-constants';
import jwtTokensConfig from './config/jwt-tokens.config';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @Inject(jwtTokensConfig.KEY)
    private jwtTokensConfiguration: ConfigType<typeof jwtTokensConfig>,
  ) {}

  async validateGoogleUser(googleUser: Prisma.UserCreateInput) {
    const user = await this.userService.findByEmail(googleUser.email);
    if (user) return user;

    return await this.userService.create(googleUser);
  }

  createAccessToken(userId: number) {
    return jwt.sign(
      {
        sub: userId,
      },
      this.jwtTokensConfiguration.accessTokenSecret,
      { expiresIn: accessTokenExpiresIn },
    );
  }

  validateToken(token: string, tokenType: 'access' | 'refresh') {
    return jwt.verify(
      token,
      tokenType === 'access'
        ? this.jwtTokensConfiguration.accessTokenSecret
        : this.jwtTokensConfiguration.refreshTokenSecret,
    );
  }
}
