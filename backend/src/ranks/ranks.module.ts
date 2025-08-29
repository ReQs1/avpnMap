import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RanksService } from './ranks.service';

@Module({
  imports: [PrismaModule],
  providers: [RanksService],
  exports: [RanksService],
})
export class RanksModule {}
