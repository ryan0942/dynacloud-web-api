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
import { CompanyInfoService } from './company-info.service';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';
import {
  CompanyInfoLocalizedResponseDto,
  CompanyInfoResponseDto,
} from './dto/company-info-response.dto';

@ApiTags('公司資訊')
@Controller('company-info')
@UseGuards(ThrottlerGuard)
export class CompanyInfoController {
  constructor(private readonly companyInfoService: CompanyInfoService) {}

  /**
   * [CI-01-U] 取得公司資訊
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get()
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'CI-01-U 取得公司資訊',
  })
  @ApiResponse({
    status: 200,
    description: '獲取公司資訊成功',
    type: CompanyInfoLocalizedResponseDto,
  })
  @ResponseMessage('獲取公司資訊成功')
  async findFirst(@Headers('accept-language') language?: string) {
    return await this.companyInfoService.findFirst(language);
  }

  /**
   * [CI-01] 管理員取得公司資訊（不進行語系轉換）
   * 返回完整的雙語數據
   */
  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CI-01 管理員取得公司資訊',
  })
  @ApiResponse({
    status: 200,
    description: '獲取公司資訊成功',
    type: CompanyInfoResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('獲取公司資訊成功')
  async findFirstByAdmin() {
    return await this.companyInfoService.findFirstByAdmin();
  }

  /**
   * [CI-02] 更新公司資訊
   */
  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CI-02 更新公司資訊',
  })
  @ApiBody({ type: UpdateCompanyInfoDto })
  @ApiResponse({
    status: 200,
    description: '公司資訊更新成功',
    type: CompanyInfoResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('公司資訊更新成功')
  async update(@Body() updateCompanyInfoDto: UpdateCompanyInfoDto) {
    return await this.companyInfoService.update(updateCompanyInfoDto);
  }
}
