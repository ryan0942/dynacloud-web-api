import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma.service';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [BlogController],
  providers: [BlogService, PrismaService],
})
export class BlogModule {}
