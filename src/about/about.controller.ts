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
import { AboutService } from './about.service';
import { UpdateAboutDto } from './dto/update-about.dto';
import {
  AboutLocalizedResponseDto,
  AboutResponseDto,
} from './dto/about-response.dto';

@ApiTags('關於我們')
@Controller('about')
@UseGuards(ThrottlerGuard)
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  /**
   * [AB-01-U] 取得關於我們
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get()
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'AB-01-U 取得關於我們',
  })
  @ApiResponse({
    status: 200,
    description: '獲取關於我們成功',
    type: AboutLocalizedResponseDto,
  })
  @ResponseMessage('獲取關於我們成功')
  async findFirst(@Headers('accept-language') language?: string) {
    return await this.aboutService.findFirst(language);
  }

  /**
   * [AB-01] 管理員取得關於我們（不進行語系轉換）
   * 返回完整的雙語數據
   */
  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'AB-01 管理員取得關於我們',
  })
  @ApiResponse({
    status: 200,
    description: '獲取關於我們成功',
    type: AboutResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('獲取關於我們成功')
  async findFirstByAdmin() {
    return await this.aboutService.findFirstByAdmin();
  }

  /**
   * [AB-02] 更新關於我們
   */
  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'AB-02 更新關於我們',
  })
  @ApiBody({ type: UpdateAboutDto })
  @ApiResponse({
    status: 200,
    description: '關於我們更新成功',
    type: AboutResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('關於我們更新成功')
  async update(@Body() updateAboutDto: UpdateAboutDto) {
    return await this.aboutService.update(updateAboutDto);
  }
}
