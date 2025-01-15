import { Module } from '@nestjs/common';
import { BrechasModule } from './brechas/brechas.module';
import { BrechasController } from './brechas/brechas.controller';
import { BrechasService } from './brechas/brechas.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [BrechasModule],
  controllers: [BrechasController],
  providers: [BrechasService, PrismaService],
})
export class AppModule {}
