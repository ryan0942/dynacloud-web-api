import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
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
import { CaseCategoryService } from './case-category.service';
import {
  CaseCategoryDeleteResponseDto,
  CaseCategoryListResponseDto,
  CaseCategoryLocalizedListResponseDto,
  CaseCategoryLocalizedResponseDto,
  CaseCategoryResponseDto,
} from './dto/case-category-response.dto';
import { CreateCaseCategoryDto } from './dto/create-case-category.dto';
import { UpdateCaseCategoryDto } from './dto/update-case-category.dto';

@ApiTags('案例分享分類')
@Controller('case-categories')
@UseGuards(ThrottlerGuard)
export class CaseCategoryController {
  constructor(private readonly caseCategoryService: CaseCategoryService) {}

  /**
   * [CC-01] 建立案例分類
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CC-01 建立案例分類',
  })
  @ApiResponse({
    status: 201,
    description: '案例分類創建成功',
    type: CaseCategoryResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiBody({ type: CreateCaseCategoryDto })
  @ResponseMessage('案例分類創建成功')
  async create(@Body() createCaseCategoryDto: CreateCaseCategoryDto) {
    return await this.caseCategoryService.create(createCaseCategoryDto);
  }

  /**
   * [CC-02-U] 取得所有案例分類
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get()
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'CC-02-U 取得所有案例分類',
  })
  @ApiResponse({
    status: 200,
    description: '獲取案例分類列表成功',
    type: CaseCategoryLocalizedListResponseDto,
  })
  @ResponseMessage('獲取案例分類列表成功')
  async findAll(@Headers('accept-language') language?: string) {
    return await this.caseCategoryService.findAll(language);
  }

  /**
   * [CC-02] 管理員取得所有案例分類（不進行語系轉換）
   * 返回完整的雙語數據
   */
  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CC-02 管理員取得所有案例分類',
  })
  @ApiResponse({
    status: 200,
    description: '獲取案例分類列表成功',
    type: CaseCategoryListResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('獲取案例分類列表成功')
  async findAllByAdmin() {
    return await this.caseCategoryService.findAllByAdmin();
  }

  /**
   * [CC-03] 管理員取得單個案例分類（不進行語系轉換）
   * 返回完整的雙語數據
   */
  @Get('admin/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CC-03 管理員取得單個案例分類',
  })
  @ApiResponse({
    status: 200,
    description: '獲取案例分類詳情成功',
    type: CaseCategoryResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '案例分類不存在' })
  @ResponseMessage('獲取案例分類詳情成功')
  async findOneByAdmin(@Param('id') id: string) {
    return await this.caseCategoryService.findOneByAdmin(id);
  }

  /**
   * [CC-03-U] 取得單個案例分類
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get(':id')
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'CC-03-U 取得單個案例分類',
  })
  @ApiResponse({
    status: 200,
    description: '獲取案例分類詳情成功',
    type: CaseCategoryLocalizedResponseDto,
  })
  @ApiResponse({ status: 404, description: '案例分類不存在' })
  @ResponseMessage('獲取案例分類詳情成功')
  async findOne(
    @Param('id') id: string,
    @Headers('accept-language') language?: string,
  ) {
    return await this.caseCategoryService.findOne(id, language);
  }

  /**
   * [CC-04] 更新案例分類
   */
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CC-04 更新案例分類',
  })
  @ApiResponse({
    status: 200,
    description: '案例分類更新成功',
    type: CaseCategoryResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '案例分類不存在' })
  @ApiBody({})
  @ResponseMessage('案例分類更新成功')
  async update(
    @Param('id') id: string,
    @Body() updateCaseCategoryDto: UpdateCaseCategoryDto,
  ) {
    return await this.caseCategoryService.update(id, updateCaseCategoryDto);
  }

  /**
   * [CC-05] 刪除案例分類
   */
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CC-05 刪除案例分類',
  })
  @ApiResponse({
    status: 200,
    description: '案例分類刪除成功',
    type: CaseCategoryDeleteResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '案例分類不存在' })
  @ResponseMessage('案例分類刪除成功')
  async remove(@Param('id') id: string) {
    return await this.caseCategoryService.remove(id);
  }
}
