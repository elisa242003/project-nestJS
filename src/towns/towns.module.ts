import { Module } from '@nestjs/common';
import { TownsService } from './towns.service';
import { TownsController } from './towns.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TownsController],
  providers: [TownsService, PrismaService],
})
export class TownsModule {}
