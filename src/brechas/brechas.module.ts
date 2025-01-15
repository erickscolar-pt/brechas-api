import { Module } from '@nestjs/common';
import { BrechasService } from './brechas.service';
import { BrechasController } from './brechas.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BrechasController],
  providers: [BrechasService, PrismaService],
})
export class BrechasModule {}
