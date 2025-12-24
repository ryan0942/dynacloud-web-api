import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma.service';
import { BlogCategoryController } from './blog-category.controller';
import { BlogCategoryService } from './blog-category.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [BlogCategoryController],
  providers: [BlogCategoryService, PrismaService],
})
export class BlogCategoryModule {}
