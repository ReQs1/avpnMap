import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { Prisma } from 'prisma/generated/client/client';
import { UserService } from 'src/user/user.service';
import jwtTokensConfig from './config/jwt-tokens.config';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from './constants/jwt-constants';
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

  createJwtToken(userId: number, tokenType: 'access' | 'refresh') {
    return jwt.sign(
      {
        sub: userId,
      },
      tokenType === 'access'
        ? this.jwtTokensConfiguration.accessTokenSecret
        : this.jwtTokensConfiguration.refreshTokenSecret,
      {
        expiresIn:
          tokenType === 'access'
            ? ACCESS_TOKEN_EXPIRES_IN
            : REFRESH_TOKEN_EXPIRES_IN,
      },
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
