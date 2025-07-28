import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';
import { ConfigType } from '@nestjs/config';
import accessTokenConfig from './config/access-token.config';
import { accessTokenExpiresIn } from './constants/jwt-constants';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @Inject(accessTokenConfig.KEY)
    private accessTokenConfiguration: ConfigType<typeof accessTokenConfig>,
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
      this.accessTokenConfiguration.accessTokenSecret,
      { expiresIn: accessTokenExpiresIn },
    );
  }
}
