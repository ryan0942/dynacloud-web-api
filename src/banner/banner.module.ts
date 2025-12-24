import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BannerController],
  providers: [BannerService, PrismaService],
  exports: [BannerService],
})
export class BannerModule {}
