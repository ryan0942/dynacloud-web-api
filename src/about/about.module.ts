import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma.service';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [AboutController],
  providers: [AboutService, PrismaService],
})
export class AboutModule {}
