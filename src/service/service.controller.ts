import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import {
  FindAllServiceParams,
  FindAllByAdminParams,
  ServiceService
} from './service.service';
import {
  ServiceResponseDto,
  ServiceListResponseDto,
  ServiceAdminListResponseDto,
  ServiceLocalizedDetailResponseDto,
  ServiceDeleteResponseDto,
} from './dto/service-response.dto';

@ApiTags('產品服務')
@Controller('services')
@UseGuards(ThrottlerGuard)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  /**
   * [SE-01] 建立產品服務
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'SE-01 建立產品服務',
  })
  @ApiBody({ type: CreateServiceDto })
  @ApiResponse({
    status: 201,
    description: '產品服務創建成功',
    type: ServiceResponseDto,
  })
  @ApiResponse({ status: 400, description: '請求參數錯誤' })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('產品服務創建成功')
  async create(@Body() createServiceDto: CreateServiceDto) {
    return await this.serviceService.create(createServiceDto);
  }

  /**
   * [SE-02-U] 取得所有產品服務（帶分頁和搜索）
   * @Query page - 頁碼（默認 1）
   * @Query limit - 每頁數量（默認 25）
   * @Query categoryId - 分類 ID 篩選
   * @Query query - 關鍵字搜索（搜索標題、描述）
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get()
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'SE-02-U 取得所有產品服務',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: '頁碼' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: '每頁數量' })
  @ApiQuery({ name: 'categoryId', required: false, type: String, description: '分類 ID' })
  @ApiQuery({ name: 'query', required: false, type: String, description: '搜索關鍵字' })
  @ApiResponse({
    status: 200,
    description: '獲取產品服務列表成功',
    type: ServiceListResponseDto,
  })
  @ResponseMessage('獲取產品服務列表成功')
  async findAll(
    @Query() query: FindAllServiceParams,
    @Headers('accept-language') language?: string,
  ) {
    const params: FindAllServiceParams = {
      page: query.page ? Number(query.page) : undefined,
      limit: query.limit ? Number(query.limit) : undefined,
      categoryId: query.categoryId,
      query: query.query,
      language: language,
    };
    return await this.serviceService.findAll(params);
  }

  /**
   * [SE-02] 管理員取得所有產品服務（帶分頁和搜索，不進行語系轉換）
   * @Query page - 頁碼（默認 1）
   * @Query limit - 每頁數量（默認 25）
   * @Query categoryId - 分類 ID 篩選
   * @Query query - 關鍵字搜索（搜索標題、描述）
   * @Query status - 狀態篩選（Active, Draft, Closed）
   * 返回完整的雙語數據，但不包含 content
   */
  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'SE-02 管理員取得所有產品服務',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'categoryId', required: false, type: String })
  @ApiQuery({ name: 'query', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: ['Active', 'Draft', 'Closed'] })
  @ApiQuery({ name: 'language', required: false, type: String, description: '語言篩選（zh 或 en）' })
  @ApiResponse({
    status: 200,
    description: '獲取產品服務列表成功',
    type: ServiceAdminListResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('獲取產品服務列表成功')
  async findAllByAdmin(@Query() query: FindAllByAdminParams) {
    const params: FindAllByAdminParams = {
      page: query.page ? Number(query.page) : undefined,
      limit: query.limit ? Number(query.limit) : undefined,
      categoryId: query.categoryId,
      query: query.query,
      status: query.status,
      language: query.language,
    };
    return await this.serviceService.findAllByAdmin(params);
  }

  /**
   * [SE-03] 管理員取得單個產品服務（不進行語系轉換）
   * 返回完整的雙語數據，包含 content
   */
  @Get('admin/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'SE-03 管理員取得單個產品服務',
  })
  @ApiResponse({
    status: 200,
    description: '獲取產品服務詳情成功',
    type: ServiceResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '產品服務不存在' })
  @ResponseMessage('獲取產品服務詳情成功')
  async findOneByAdmin(@Param('id') id: string) {
    return await this.serviceService.findOneByAdmin(id);
  }

  /**
   * [SE-03-U] 取得單個產品服務
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get(':id')
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'SE-03-U 取得單個產品服務',
  })
  @ApiResponse({
    status: 200,
    description: '獲取產品服務詳情成功',
    type: ServiceLocalizedDetailResponseDto,
  })
  @ApiResponse({ status: 404, description: '產品服務不存在' })
  @ResponseMessage('獲取產品服務詳情成功')
  async findOne(
    @Param('id') id: string,
    @Headers('accept-language') language?: string,
  ) {
    return await this.serviceService.findOne(id, language);
  }

  /**
   * [SE-04] 更新產品服務
   */
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'SE-04 更新產品服務',
  })
  @ApiBody({ type: UpdateServiceDto })
  @ApiResponse({
    status: 200,
    description: '產品服務更新成功',
    type: ServiceResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '產品服務不存在' })
  @ResponseMessage('產品服務更新成功')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return await this.serviceService.update(id, updateServiceDto);
  }

  /**
   * [SE-05] 刪除產品服務
   */
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'SE-05 刪除產品服務',
  })
  @ApiResponse({
    status: 200,
    description: '產品服務刪除成功',
    type: ServiceDeleteResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '產品服務不存在' })
  @ResponseMessage('產品服務刪除成功')
  async remove(@Param('id') id: string) {
    return await this.serviceService.remove(id);
  }
}
