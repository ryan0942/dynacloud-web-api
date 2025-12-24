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
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import {
  ServiceCategoryResponseDto,
  ServiceCategoryListResponseDto,
  ServiceCategoryAdminListResponseDto,
  ServiceCategoryDeleteResponseDto,
} from './dto/service-category-response.dto';
import { ServiceCategoryService } from './service-category.service';

@ApiTags('產品服務分類')
@Controller('service-categories')
@UseGuards(ThrottlerGuard)
export class ServiceCategoryController {
  constructor(
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}

  /**
   * [SC-01] 建立服務分類
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'SC-01 建立服務分類',
  })
  @ApiBody({ type: CreateServiceCategoryDto })
  @ApiResponse({
    status: 201,
    description: '服務分類創建成功',
    type: ServiceCategoryResponseDto,
  })
  @ApiResponse({ status: 400, description: '請求參數錯誤' })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('服務分類創建成功')
  async create(@Body() createServiceCategoryDto: CreateServiceCategoryDto) {
    return await this.serviceCategoryService.create(createServiceCategoryDto);
  }

  /**
   * [SC-02-U] 取得所有服務分類
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get()
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'SC-02-U 取得所有服務分類',
  })
  @ApiResponse({
    status: 200,
    description: '獲取服務分類列表成功',
    type: ServiceCategoryListResponseDto,
  })
  @ResponseMessage('獲取服務分類列表成功')
  async findAll(@Headers('accept-language') language?: string) {
    return await this.serviceCategoryService.findAll(language);
  }

  /**
   * [SC-02] 管理員取得所有服務分類（不進行語系轉換）
   * 返回完整的雙語數據
   */
  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'SC-02 管理員取得所有服務分類',
  })
  @ApiResponse({
    status: 200,
    description: '獲取服務分類列表成功',
    type: ServiceCategoryAdminListResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('獲取服務分類列表成功')
  async findAllByAdmin() {
    return await this.serviceCategoryService.findAllByAdmin();
  }

  /**
   * [SC-03] 管理員取得單個服務分類（不進行語系轉換）
   * 返回完整的雙語數據，包含關聯的服務
   */
  @Get('admin/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'SC-03 管理員取得單個服務分類',
  })
  @ApiResponse({
    status: 200,
    description: '獲取服務分類詳情成功',
    type: ServiceCategoryResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '服務分類不存在' })
  @ResponseMessage('獲取服務分類詳情成功')
  async findOneByAdmin(@Param('id') id: string) {
    return await this.serviceCategoryService.findOneByAdmin(id);
  }

  /**
   * [SC-03-U] 取得單個服務分類
   */
  @Get(':id')
  @ApiOperation({
    summary: 'SC-03-U 取得單個服務分類',
  })
  @ApiResponse({
    status: 200,
    description: '獲取服務分類詳情成功',
    type: ServiceCategoryResponseDto,
  })
  @ApiResponse({ status: 404, description: '服務分類不存在' })
  @ResponseMessage('獲取服務分類詳情成功')
  async findOne(@Param('id') id: string) {
    return await this.serviceCategoryService.findOne(id);
  }

  /**
   * [SC-04] 更新服務分類
   */
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'SC-04 更新服務分類',
  })
  @ApiBody({ type: UpdateServiceCategoryDto })
  @ApiResponse({
    status: 200,
    description: '服務分類更新成功',
    type: ServiceCategoryResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '服務分類不存在' })
  @ResponseMessage('服務分類更新成功')
  async update(
    @Param('id') id: string,
    @Body() updateServiceCategoryDto: UpdateServiceCategoryDto,
  ) {
    return await this.serviceCategoryService.update(
      id,
      updateServiceCategoryDto,
    );
  }

  /**
   * [SC-05] 刪除服務分類
   */
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'SC-05 刪除服務分類',
  })
  @ApiResponse({
    status: 200,
    description: '服務分類刪除成功',
    type: ServiceCategoryDeleteResponseDto,
  })
  @ApiResponse({ status: 400, description: '無法刪除此分類，因為還有相關聯的產品服務' })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '服務分類不存在' })
  @ResponseMessage('服務分類刪除成功')
  async remove(@Param('id') id: string) {
    return await this.serviceCategoryService.remove(id);
  }
}
