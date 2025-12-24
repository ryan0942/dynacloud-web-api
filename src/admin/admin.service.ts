import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { omit } from 'ramda';

import { Admin } from '@/types/index';
import { UpdateAdminDto } from './dto/update-admin.dto';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
    });
    if (!admin) {
      throw new NotFoundException('管理員不存在');
    }
    const result = omit(['password', 'createdAt', 'updatedAt'], admin);

    return result;
  }

  // 更新管理員資料
  async update(id: string, payload: UpdateAdminDto) {
    await this.prisma.admin.update({ where: { id }, data: payload });

    return null;
  }

  // 變更密碼
  async changePassword(
    id: string,
    payload: {
      oldPassword: string;
      newPassword: string;
      confirmPassword: string;
    },
  ) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });

    if (!admin) throw new NotFoundException('管理員不存在');
    if (payload.newPassword !== payload.confirmPassword) {
      throw new BadRequestException('新密碼與確認密碼不相符');
    }

    const isPasswordCorrect = await bcrypt.compare(
      payload.oldPassword,
      admin.password,
    );

    if (!isPasswordCorrect) throw new BadRequestException('舊密碼錯誤');

    const hashedPassword = await bcrypt.hash(payload.newPassword, 10);
    await this.prisma.admin.update({
      where: { id },
      data: { password: hashedPassword },
    });
    return null;
  }
}
