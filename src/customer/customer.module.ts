import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma.service';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService],
})
export class CustomerModule {}
