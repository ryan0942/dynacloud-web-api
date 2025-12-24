import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma.service';
import { CaseCategoryController } from './case-category.controller';
import { CaseCategoryService } from './case-category.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CaseCategoryController],
  providers: [CaseCategoryService, PrismaService],
})
export class CaseCategoryModule {}
