import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma.service';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CaseController],
  providers: [CaseService, PrismaService],
})
export class CaseModule {}
