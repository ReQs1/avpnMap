import { Module } from '@nestjs/common';
import { ConditionalModule, ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AchievementsModule } from './achievements/achievements.module';
import { AuthModule } from './auth/auth.module';
import { PizzeriasModule } from './pizzerias/pizzerias.module';
import { PrismaModule } from './prisma/prisma.module';
import { RanksModule } from './ranks/ranks.module';
import { UserModule } from './user/user.module';
import { VisitsModule } from './visits/visits.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConditionalModule.registerWhen(
      ThrottlerModule.forRoot({
        throttlers: [
          {
            limit: 200,
            ttl: 60000,
          },
        ],
      }),
      (env: NodeJS.ProcessEnv) => env['NODE_ENV'] === 'production',
    ),
    PrismaModule,
    AuthModule,
    UserModule,
    PizzeriasModule,
    VisitsModule,
    AchievementsModule,
    RanksModule,
  ],
})
export class AppModule {}
