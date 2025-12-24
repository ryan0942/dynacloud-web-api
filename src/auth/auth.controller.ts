import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { ResponseMessage } from '@/src/common/decorators/response-message.decorator';

import { Admin } from '@/types/index';

type LoginResponse = Omit<Admin, 'password' | 'createdAt' | 'updatedAt'>;

import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { LoginSuccessResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('認證授權')
@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

/**
 * [AC-01] 登入
 */
  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: 'AC-01 登入',
  })
  @ApiResponse({
    status: 200,
    description: '登入成功',
    type: LoginSuccessResponseDto,
  })
  @ApiResponse({ status: 401, description: '帳號或密碼錯誤' })
  @ApiBody({
    type: LoginDto,
  })
  @ResponseMessage('登入成功')
  async login(@Body() body: { account: string; password: string }) {
    const admin: LoginResponse | null = await this.authService.validateAdmin(
      body.account,
      body.password,
    );
    if (!admin) {
      throw new UnauthorizedException('帳號或密碼錯誤');
    }
    return this.authService.login(admin);
  }
}
