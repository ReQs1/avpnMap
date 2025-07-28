import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import googleConfig from './config/google.config';
import { GoogleStrategy } from './strategy/google.strategy';
import accessTokenConfig from './config/access-token.config';

@Module({
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
  imports: [
    ConfigModule.forFeature(googleConfig),
    ConfigModule.forFeature(accessTokenConfig),
    UserModule,
  ],
})
export class AuthModule {}
