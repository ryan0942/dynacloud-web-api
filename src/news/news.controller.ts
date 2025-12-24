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
import { CreateNewsDto } from './dto/create-news.dto';
import {
  NewsDeleteResponseDto,
  NewsListResponseDto,
  NewsLocalizedListResponseDto,
  NewsLocalizedResponseDto,
  NewsLocalizedSummaryDto,
  NewsResponseDto,
} from './dto/news-response.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import {
  FindAllByAdminParams,
  FindAllNewsParams,
  NewsService,
} from './news.service';

@ApiTags('媒體活動')
@Controller('news')
@UseGuards(ThrottlerGuard)
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  /**
   * [NE-01] 建立新聞
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'NE-01 建立新聞',
  })
  @ApiBody({ type: CreateNewsDto })
  @ApiResponse({
    status: 201,
    description: '新聞創建成功',
    type: NewsResponseDto,
  })
  @ApiResponse({ status: 400, description: '請求參數錯誤' })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('新聞創建成功')
  async create(@Body() createNewsDto: CreateNewsDto) {
    return await this.newsService.create(createNewsDto);
  }

  /**
   * [NE-02-U] 取得所有新聞（帶分頁和搜索）
   * @Query page - 頁碼（默認 1）
   * @Query limit - 每頁數量（默認 25）
   * @Query categoryId - 分類 ID 篩選
   * @Query query - 關鍵字搜索（搜索標題、描述、標籤）
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get()
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'NE-02-U 取得所有新聞',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: '頁碼' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: '每頁數量' })
  @ApiQuery({ name: 'categoryId', required: false, type: String, description: '分類 ID' })
  @ApiQuery({ name: 'query', required: false, type: String, description: '搜索關鍵字' })
  @ApiResponse({
    status: 200,
    description: '獲取新聞列表成功',
    type: NewsLocalizedListResponseDto,
  })
  @ResponseMessage('獲取新聞列表成功')
  async findAll(
    @Query() query: FindAllNewsParams,
    @Headers('accept-language') language?: string,
  ) {
    const params: FindAllNewsParams = {
      page: query.page ? Number(query.page) : undefined,
      limit: query.limit ? Number(query.limit) : undefined,
      categoryId: query.categoryId,
      query: query.query,
      language: language,
    };
    return await this.newsService.findAll(params);
  }

  /**
   * [NE-02] 管理員取得所有新聞（帶分頁和搜索，不進行語系轉換）
   * @Query page - 頁碼（默認 1）
   * @Query limit - 每頁數量（默認 25）
   * @Query categoryId - 分類 ID 篩選
   * @Query query - 關鍵字搜索（搜索標題、描述、標籤）
   * @Query status - 狀態篩選（Active, Draft, Closed）
   * 返回完整的雙語數據，包含 content
   */
  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'NE-02 管理員取得所有新聞',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'categoryId', required: false, type: String })
  @ApiQuery({ name: 'query', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: ['Active', 'Draft', 'Closed'] })
  @ApiQuery({ name: 'language', required: false, type: String, description: '語言篩選（zh 或 en）' })
  @ApiResponse({
    status: 200,
    description: '獲取新聞列表成功',
    type: NewsListResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('獲取新聞列表成功')
  async findAllByAdmin(@Query() query: FindAllByAdminParams) {
    const params: FindAllByAdminParams = {
      page: query.page ? Number(query.page) : undefined,
      limit: query.limit ? Number(query.limit) : undefined,
      categoryId: query.categoryId,
      query: query.query,
      status: query.status,
      language: query.language,
    };
    return await this.newsService.findAllByAdmin(params);
  }

  /**
   * [NE-03] 管理員取得單個新聞（不進行語系轉換）
   * 返回完整的雙語數據，包含 content
   */
  @Get('admin/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'NE-03 管理員取得單個新聞',
  })
  @ApiResponse({
    status: 200,
    description: '獲取新聞詳情成功',
    type: NewsResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '新聞不存在' })
  @ResponseMessage('獲取新聞詳情成功')
  async findOneByAdmin(@Param('id') id: string) {
    return await this.newsService.findOneByAdmin(id);
  }

  /**
   * [NE-03-U] 取得單個新聞
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get(':id')
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'NE-03-U 取得單個新聞',
  })
  @ApiResponse({
    status: 200,
    description: '獲取新聞詳情成功',
    type: NewsLocalizedResponseDto,
  })
  @ApiResponse({ status: 404, description: '新聞不存在' })
  @ResponseMessage('獲取新聞詳情成功')
  async findOne(
    @Param('id') id: string,
    @Headers('accept-language') language?: string,
  ) {
    return await this.newsService.findOne(id, language);
  }

  /**
   * [NE-04] 更新新聞
   */
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'NE-04 更新新聞',
  })
  @ApiBody({ type: UpdateNewsDto })
  @ApiResponse({
    status: 200,
    description: '新聞更新成功',
    type: NewsResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '新聞不存在' })
  @ResponseMessage('新聞更新成功')
  async update(
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
  ) {
    return await this.newsService.update(id, updateNewsDto);
  }

  /**
   * [NE-05] 刪除新聞
   */
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'NE-05 刪除新聞',
  })
  @ApiResponse({
    status: 200,
    description: '新聞刪除成功',
    type: NewsDeleteResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '新聞不存在' })
  @ResponseMessage('新聞刪除成功')
  async remove(@Param('id') id: string) {
    return await this.newsService.remove(id);
  }
}
