import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigType } from '@nestjs/config';
import googleConfig from '../config/google.config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleConfig.KEY)
    private googleConfiguration: ConfigType<typeof googleConfig>,
    private authService: AuthService,
  ) {
    super({
      clientID: googleConfiguration.googleClient!,
      clientSecret: googleConfiguration.googleSecret!,
      callbackURL: googleConfiguration.GoogleCallbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const user = await this.authService.validateGoogleUser({
      username: profile.displayName,
      email: profile.emails[0].value,
      avatarURL: profile.photos[0].value,
    });

    return user;
  }
}
