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
import { BlogCategoryService } from './blog-category.service';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import {
  BlogCategoryResponseDto,
  BlogCategoryListResponseDto,
  BlogCategoryLocalizedListResponseDto,
  BlogCategoryLocalizedResponseDto,
  BlogCategoryDeleteResponseDto,
} from './dto/blog-category-response.dto';

@ApiTags('資訊專欄類別')
@Controller('blog-categories')
@UseGuards(ThrottlerGuard)
export class BlogCategoryController {
  constructor(private readonly blogCategoryService: BlogCategoryService) {}

  /**
   * [BC-01] 建立部落格分類
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'BC-01 建立部落格分類',
  })
  @ApiBody({ type: CreateBlogCategoryDto })
  @ApiResponse({
    status: 201,
    description: '部落格分類創建成功',
    type: BlogCategoryResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('部落格分類創建成功')
  async create(@Body() createBlogCategoryDto: CreateBlogCategoryDto) {
    return await this.blogCategoryService.create(createBlogCategoryDto);
  }

  /**
   * [BC-02-U] 取得所有部落格分類
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get()
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'BC-02-U 取得所有部落格分類',
  })
  @ApiResponse({
    status: 200,
    description: '獲取部落格分類列表成功',
    type: BlogCategoryLocalizedListResponseDto,
  })
  @ResponseMessage('獲取部落格分類列表成功')
  async findAll(@Headers('accept-language') language?: string) {
    return await this.blogCategoryService.findAll(language);
  }

  /**
   * [BC-02-A] 管理員取得所有部落格分類（不進行語系轉換）
   * 返回完整的雙語數據
   */
  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'BC-02-A 管理員取得所有部落格分類',
  })
  @ApiResponse({
    status: 200,
    description: '獲取部落格分類列表成功',
    type: BlogCategoryListResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('獲取部落格分類列表成功（管理員）')
  async findAllByAdmin() {
    return await this.blogCategoryService.findAllByAdmin();
  }

  /**
   * [BC-03-A] 管理員取得單個部落格分類（不進行語系轉換）
   * 返回完整的雙語數據
   */
  @Get('admin/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'BC-03-A 管理員取得單個部落格分類',
  })
  @ApiResponse({
    status: 200,
    description: '獲取部落格分類詳情成功',
    type: BlogCategoryResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '部落格分類不存在' })
  @ResponseMessage('獲取部落格分類詳情成功（管理員）')
  async findOneByAdmin(@Param('id') id: string) {
    return await this.blogCategoryService.findOneByAdmin(id);
  }

  /**
   * [BC-03-U] 取得單個部落格分類
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get(':id')
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'BC-03-U 取得單個部落格分類',
  })
  @ApiResponse({
    status: 200,
    description: '獲取部落格分類詳情成功',
    type: BlogCategoryLocalizedResponseDto,
  })
  @ApiResponse({ status: 404, description: '部落格分類不存在' })
  @ResponseMessage('獲取部落格分類詳情成功')
  async findOne(
    @Param('id') id: string,
    @Headers('accept-language') language?: string,
  ) {
    return await this.blogCategoryService.findOne(id, language);
  }

  /**
   * [BC-04] 更新部落格分類
   */
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'BC-04 更新部落格分類',
  })
  @ApiBody({ type: UpdateBlogCategoryDto })
  @ApiResponse({
    status: 200,
    description: '部落格分類更新成功',
    type: BlogCategoryResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '部落格分類不存在' })
  @ResponseMessage('部落格分類更新成功')
  async update(
    @Param('id') id: string,
    @Body() updateBlogCategoryDto: UpdateBlogCategoryDto,
  ) {
    return await this.blogCategoryService.update(id, updateBlogCategoryDto);
  }

  /**
   * [BC-05] 刪除部落格分類
   */
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'BC-05 刪除部落格分類',
  })
  @ApiResponse({
    status: 200,
    description: '部落格分類刪除成功',
    type: BlogCategoryDeleteResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '部落格分類不存在' })
  @ResponseMessage('部落格分類刪除成功')
  async remove(@Param('id') id: string) {
    return await this.blogCategoryService.remove(id);
  }
}
