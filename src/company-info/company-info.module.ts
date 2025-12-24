import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma.service';
import { CompanyInfoController } from './company-info.controller';
import { CompanyInfoService } from './company-info.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CompanyInfoController],
  providers: [CompanyInfoService, PrismaService],
})
export class CompanyInfoModule {}
