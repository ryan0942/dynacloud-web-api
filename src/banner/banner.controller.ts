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
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import {
  BannerService,
  FindAllBannerParams,
  FindAllByAdminParams,
} from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { UpdateBannerSortDto } from './dto/update-banner-sort.dto';
import {
  BannerResponseDto,
  BannerListResponseDto,
  BannerAdminListResponseDto,
  BannerDeleteResponseDto,
} from './dto/banner-response.dto';

@ApiTags('首頁輪播Banner')
@Controller('banners')
@UseGuards(ThrottlerGuard)
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  /**
   * [BA-01] 建立 Banner
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'BA-01 建立 Banner',
  })
  @ApiBody({ type: CreateBannerDto })
  @ApiResponse({
    status: 201,
    description: 'Banner 創建成功',
    type: BannerResponseDto,
  })
  @ApiResponse({ status: 400, description: '請求參數錯誤' })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('Banner 創建成功')
  async create(@Body() createBannerDto: CreateBannerDto) {
    return await this.bannerService.create(createBannerDto);
  }

  /**
   * [BA-02-U] 取得所有 Banner（用戶端）
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get()
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'BA-02-U 取得所有 Banner',
  })
  @ApiResponse({
    status: 200,
    description: '獲取 Banner 列表成功',
    type: BannerListResponseDto,
  })
  @ResponseMessage('獲取 Banner 列表成功')
  async findAll(@Headers('accept-language') language?: string) {
    const params: FindAllBannerParams = {
      language: language,
    };
    return await this.bannerService.findAll(params);
  }

  /**
   * [BA-02] 管理員取得所有 Banner（包含完整資料和 sortOrder）
   */
  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'BA-02 管理員取得所有 Banner',
  })
  @ApiQuery({
    name: 'language',
    required: false,
    type: String,
    description: '語言篩選（zh 或 en）',
  })
  @ApiResponse({
    status: 200,
    description: '獲取 Banner 列表成功',
    type: BannerAdminListResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('獲取 Banner 列表成功')
  async findAllByAdmin(@Query() query: FindAllByAdminParams) {
    const params: FindAllByAdminParams = {
      language: query.language,
    };
    return await this.bannerService.findAllByAdmin(params);
  }

  /**
   * [BA-03] 管理員取得單個 Banner（完整資料）
   */
  @Get('admin/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'BA-03 管理員取得單個 Banner',
  })
  @ApiResponse({
    status: 200,
    description: '獲取 Banner 詳情成功',
    type: BannerResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: 'Banner 不存在' })
  @ResponseMessage('獲取 Banner 詳情成功')
  async findOneByAdmin(@Param('id') id: string) {
    return await this.bannerService.findOneByAdmin(id);
  }

  /**
   * [BA-03-U] 取得單個 Banner（用戶端）
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get(':id')
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'BA-03-U 取得單個 Banner',
  })
  @ApiResponse({
    status: 200,
    description: '獲取 Banner 詳情成功',
    type: BannerListResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Banner 不存在' })
  @ResponseMessage('獲取 Banner 詳情成功')
  async findOne(
    @Param('id') id: string,
    @Headers('accept-language') language?: string,
  ) {
    return await this.bannerService.findOne(id, language);
  }

  /**
   * [BA-04] 批次更新 Banner 排序
   * 注意：此路由必須放在 :id 路由之前，避免 'sort' 被當成 id
   */
  @Put('sort')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'BA-04 批次更新 Banner 排序',
  })
  @ApiBody({ type: UpdateBannerSortDto })
  @ApiResponse({
    status: 200,
    description: 'Banner 排序更新成功',
    type: BannerAdminListResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: 'Banner 不存在' })
  @ResponseMessage('Banner 排序更新成功')
  async updateSort(@Body() updateBannerSortDto: UpdateBannerSortDto) {
    return await this.bannerService.updateSort(updateBannerSortDto);
  }

  /**
   * [BA-05] 更新 Banner
   */
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'BA-05 更新 Banner',
  })
  @ApiBody({ type: UpdateBannerDto })
  @ApiResponse({
    status: 200,
    description: 'Banner 更新成功',
    type: BannerResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: 'Banner 不存在' })
  @ResponseMessage('Banner 更新成功')
  async update(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateBannerDto,
  ) {
    return await this.bannerService.update(id, updateBannerDto);
  }

  /**
   * [BA-06] 刪除 Banner
   */
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'BA-06 刪除 Banner',
  })
  @ApiResponse({
    status: 200,
    description: 'Banner 刪除成功',
    type: BannerDeleteResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: 'Banner 不存在' })
  @ResponseMessage('Banner 刪除成功')
  async remove(@Param('id') id: string) {
    return await this.bannerService.remove(id);
  }
}
