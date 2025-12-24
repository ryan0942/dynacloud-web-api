import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma.service';
import { PrivacyPolicyController } from './privacy-policy.controller';
import { PrivacyPolicyService } from './privacy-policy.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [PrivacyPolicyController],
  providers: [PrivacyPolicyService, PrismaService],
})
export class PrivacyPolicyModule {}
