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
  ApiExtraModels,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import {
  BlogService,
  FindAllBlogParams,
  FindAllByAdminParams,
} from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import {
  BlogDeleteResponseDto,
  BlogDto,
  BlogListResponseDto,
  BlogLocalizedDto,
  BlogLocalizedListResponseDto,
  BlogLocalizedResponseDto,
  BlogLocalizedSummaryDto,
  BlogResponseDto,
  NestedBlogCategoryDto,
  NestedBlogCategoryLocalizedDto,
} from './dto/blog-response.dto';

@ApiTags('資訊專欄')
@ApiExtraModels(
  BlogDto,
  BlogLocalizedDto,
  BlogLocalizedSummaryDto,
  NestedBlogCategoryDto,
  NestedBlogCategoryLocalizedDto,
  BlogResponseDto,
  BlogListResponseDto,
  BlogLocalizedResponseDto,
  BlogLocalizedListResponseDto,
  BlogDeleteResponseDto,
)
@Controller('blogs')
@UseGuards(ThrottlerGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  /**
   * [BL-01] 建立部落格
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'BL-01 建立部落格',
  })
  @ApiBody({ type: CreateBlogDto })
  @ApiResponse({
    status: 201,
    description: '部落格創建成功',
    type: BlogResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('部落格創建成功')
  async create(@Body() createBlogDto: CreateBlogDto) {
    return await this.blogService.create(createBlogDto);
  }

  /**
   * [BL-02-U] 取得所有部落格（帶分頁和搜索）
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
    summary: 'BL-02-U 取得所有部落格',
  })
  @ApiQuery({ name: 'page', required: false, description: '頁碼（默認 1）' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: '每頁數量（默認 25）',
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: '分類 ID 篩選',
  })
  @ApiQuery({
    name: 'query',
    required: false,
    description: '關鍵字搜索（搜索標題、描述、標籤）',
  })
  @ApiResponse({
    status: 200,
    description: '獲取部落格列表成功',
    type: BlogLocalizedListResponseDto,
  })
  @ResponseMessage('獲取部落格列表成功')
  async findAll(
    @Query() query: FindAllBlogParams,
    @Headers('accept-language') language?: string,
  ) {
    const params: FindAllBlogParams = {
      page: query.page ? Number(query.page) : undefined,
      limit: query.limit ? Number(query.limit) : undefined,
      categoryId: query.categoryId,
      query: query.query,
      language: language,
    };
    return await this.blogService.findAll(params);
  }

  /**
   * [BL-02] 管理員取得所有部落格（帶分頁和搜索，不進行語系轉換）
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
    summary: 'BL-02 管理員取得所有部落格',
  })
  @ApiQuery({ name: 'page', required: false, description: '頁碼（默認 1）' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: '每頁數量（默認 25）',
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: '分類 ID 篩選',
  })
  @ApiQuery({
    name: 'query',
    required: false,
    description: '關鍵字搜索（搜索標題、描述、標籤）',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: '狀態篩選（Active, Draft, Closed）',
  })
  @ApiQuery({
    name: 'language',
    required: false,
    type: String,
    description: '語言篩選（zh 或 en）',
  })
  @ApiResponse({
    status: 200,
    description: '獲取部落格列表成功',
    type: BlogListResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('獲取部落格列表成功')
  async findAllByAdmin(@Query() query: FindAllByAdminParams) {
    const params: FindAllByAdminParams = {
      page: query.page ? Number(query.page) : undefined,
      limit: query.limit ? Number(query.limit) : undefined,
      categoryId: query.categoryId,
      query: query.query,
      status: query.status,
      language: query.language,
    };
    return await this.blogService.findAllByAdmin(params);
  }

  /**
   * [BL-03] 管理員取得單個部落格（不進行語系轉換）
   * 返回完整的雙語數據，包含 content
   */
  @Get('admin/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'BL-03 管理員取得單個部落格',
  })
  @ApiResponse({
    status: 200,
    description: '獲取部落格詳情成功',
    type: BlogResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '部落格不存在' })
  @ResponseMessage('獲取部落格詳情成功')
  async findOneByAdmin(@Param('id') id: string) {
    return await this.blogService.findOneByAdmin(id);
  }

  /**
   * [BL-03-U] 取得單個部落格
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get(':id')
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'BL-03-U 取得單個部落格',
  })
  @ApiResponse({
    status: 200,
    description: '獲取部落格詳情成功',
    type: BlogLocalizedResponseDto,
  })
  @ApiResponse({ status: 404, description: '部落格不存在' })
  @ResponseMessage('獲取部落格詳情成功')
  async findOne(
    @Param('id') id: string,
    @Headers('accept-language') language?: string,
  ) {
    return await this.blogService.findOne(id, language);
  }

  /**
   * [BL-04] 更新部落格
   */
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'BL-04 更新部落格',
  })
  @ApiBody({ type: UpdateBlogDto })
  @ApiResponse({
    status: 200,
    description: '部落格更新成功',
    type: BlogResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '部落格不存在' })
  @ResponseMessage('部落格更新成功')
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return await this.blogService.update(id, updateBlogDto);
  }

  /**
   * [BL-05] 刪除部落格
   */
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'BL-05 刪除部落格',
  })
  @ApiResponse({
    status: 200,
    description: '部落格刪除成功',
    type: BlogDeleteResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '部落格不存在' })
  @ResponseMessage('部落格刪除成功')
  async remove(@Param('id') id: string) {
    return await this.blogService.remove(id);
  }
}
