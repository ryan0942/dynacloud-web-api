import { Module } from '@nestjs/common';
import { NewsCategoryService } from './news-category.service';
import { NewsCategoryController } from './news-category.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [NewsCategoryController],
  providers: [NewsCategoryService, PrismaService],
  exports: [NewsCategoryService],
})
export class NewsCategoryModule {}
