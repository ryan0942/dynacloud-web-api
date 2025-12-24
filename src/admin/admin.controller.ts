// src/admin/admin.controller.ts
import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';

import { ResponseMessage } from '@/src/common/decorators/response-message.decorator';

import { ThrottlerGuard } from '@nestjs/throttler';
import {
  ChangePasswordDto,
  ChangePasswordResponseDto
} from './dto/change-password.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {
  AdminInfoResponseDto,
  AdminUpdateResponseDto
} from './dto/admin-response.dto';

@ApiTags('管理員')
@Controller('admin')
@UseGuards(ThrottlerGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

/**
 * [AD-01] 取得管理員資料
 */
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'AD-01 取得當前管理員資料',
  })
  @ApiResponse({
    status: 200,
    description: '取得管理員資料成功',
    type: AdminInfoResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('取得管理員資料成功')
  async getProfile(@Req() req) {
    // 假設 JwtStrategy.validate 已回傳 { id, email } 給 req.user
    const adminId = req.user.id;
    // 透過 service 取得完整資料（可包含其他欄位）
    return await this.adminService.findById(adminId);
  }

/**
 * [AD-02] 更新管理員資料
 */
  @UseGuards(AuthGuard('jwt'))
  @Put('me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'AD-02 更新當前管理員資料',
  })
  @ApiBody({ type: UpdateAdminDto })
  @ApiResponse({
    status: 200,
    description: '更新管理員資料成功',
    type: AdminUpdateResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('更新管理員資料成功')
  async update(@Req() req, @Body() data: UpdateAdminDto) {
    const adminId = req.user.id;
    return await this.adminService.update(adminId, data);
  }

/**
 * [AD-03] 更新管理員密碼
 */
  @UseGuards(AuthGuard('jwt'))
  @Put('me/password')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'AD-03 更新當前管理員密碼',
  })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({
    status: 200,
    description: '更新管理員密碼成功',
    type: ChangePasswordResponseDto,
  })
  @ApiResponse({ status: 400, description: '密碼驗證失敗' })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('更新管理員密碼成功')
  async changePassword(
    @Req() req,
    @Body()
    data: ChangePasswordDto,
  ) {
    const adminId = req.user.id;
    return await this.adminService.changePassword(adminId, data);
  }
}
