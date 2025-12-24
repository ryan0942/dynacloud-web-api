import { Module } from '@nestjs/common';
import { ServiceCategoryController } from './service-category.controller';
import { ServiceCategoryService } from './service-category.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ServiceCategoryController],
  providers: [ServiceCategoryService, PrismaService],
  exports: [ServiceCategoryService],
})
export class ServiceCategoryModule {}
