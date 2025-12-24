import {
  Body,
  Controller,
  Get,
  Headers,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { PrivacyPolicyService } from './privacy-policy.service';
import { UpdatePrivacyPolicyDto } from './dto/update-privacy-policy.dto';
import {
  PrivacyPolicyLocalizedResponseDto,
  PrivacyPolicyResponseDto,
} from './dto/privacy-policy-response.dto';

@ApiTags('隱私權政策')
@Controller('privacy-policy')
@UseGuards(ThrottlerGuard)
export class PrivacyPolicyController {
  constructor(private readonly privacyPolicyService: PrivacyPolicyService) {}

  /**
   * [PP-01-U] 取得隱私權政策
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get()
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'PP-01-U 取得隱私權政策',
  })
  @ApiResponse({
    status: 200,
    description: '獲取隱私權政策成功',
    type: PrivacyPolicyLocalizedResponseDto,
  })
  @ResponseMessage('獲取隱私權政策成功')
  async findFirst(@Headers('accept-language') language?: string) {
    return await this.privacyPolicyService.findFirst(language);
  }

  /**
   * [PP-01] 管理員取得隱私權政策（不進行語系轉換）
   * 返回完整的雙語數據
   */
  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'PP-01 管理員取得隱私權政策',
  })
  @ApiResponse({
    status: 200,
    description: '獲取隱私權政策成功',
    type: PrivacyPolicyResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('獲取隱私權政策成功')
  async findFirstByAdmin() {
    return await this.privacyPolicyService.findFirstByAdmin();
  }

  /**
   * [PP-02] 更新隱私權政策
   */
  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'PP-02 更新隱私權政策',
  })
  @ApiBody({ type: UpdatePrivacyPolicyDto })
  @ApiResponse({
    status: 200,
    description: '隱私權政策更新成功',
    type: PrivacyPolicyResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('隱私權政策更新成功')
  async update(@Body() updatePrivacyPolicyDto: UpdatePrivacyPolicyDto) {
    return await this.privacyPolicyService.update(updatePrivacyPolicyDto);
  }
}
