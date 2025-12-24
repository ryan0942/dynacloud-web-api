import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ServiceController],
  providers: [ServiceService, PrismaService],
  exports: [ServiceService],
})
export class ServiceModule {}
