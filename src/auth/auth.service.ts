import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';

import { pick } from 'ramda';

import { Admin } from '@/types/index';

type LoginResponse = Omit<Admin, 'password' | 'createdAt' | 'updatedAt'> & {
  avatar: string | null; // Allow avatar to be null
};

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // 驗證管理員帳號與密碼
  async validateAdmin(
    account: string,
    password: string,
  ): Promise<LoginResponse | null> {
    if (!account || !password) {
      throw new UnauthorizedException('帳號或密碼欄位錯誤');
    }

    const admin = await this.prisma.admin.findUnique({ where: { account } });

    // 確保 admin 存在，並且 password 不是 null
    if (!admin || !admin.password) {
      throw new UnauthorizedException('帳號或密碼錯誤');
    }

    // 確保 bcryptjs 正確運行
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new UnauthorizedException('帳號或密碼錯誤');
    }

    const result = pick(['id', 'account', 'name', 'avatar'], admin);
    return {
      ...result,
      avatar: result.avatar || '', // 預設值
    };
  }

  // 登入成功後產生 JWT access token
  async login(admin: { account: string; id: string }) {
    try {
      const payload = { account: admin.account, sub: admin.id };
      // 設定 access token 的有效時間為一天
      const access_token = this.jwtService.sign(payload);

      return {
        access_token,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new UnauthorizedException('登入失敗');
      }
      throw error;
    }
  }
}
