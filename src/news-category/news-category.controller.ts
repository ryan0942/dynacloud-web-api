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
import { NewsCategoryService } from './news-category.service';
import { CreateNewsCategoryDto } from './dto/create-news-category.dto';
import { UpdateNewsCategoryDto } from './dto/update-news-category.dto';
import {
  NewsCategoryResponseDto,
  NewsCategoryListResponseDto,
  NewsCategoryLocalizedListResponseDto,
  NewsCategoryLocalizedResponseDto,
  NewsCategoryDeleteResponseDto,
} from './dto/news-category-response.dto';

@ApiTags('媒體活動分類')
@Controller('news-categories')
@UseGuards(ThrottlerGuard)
export class NewsCategoryController {
  constructor(private readonly newsCategoryService: NewsCategoryService) {}

  /**
   * [NC-01] 建立新聞分類
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'NC-01 建立新聞分類',
  })
  @ApiBody({ type: CreateNewsCategoryDto })
  @ApiResponse({
    status: 201,
    description: '新聞分類創建成功',
    type: NewsCategoryResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('新聞分類創建成功')
  async create(@Body() createNewsCategoryDto: CreateNewsCategoryDto) {
    return await this.newsCategoryService.create(createNewsCategoryDto);
  }

  /**
   * [NC-02-U] 取得所有新聞分類
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get()
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'NC-02-U 取得所有新聞分類',
  })
  @ApiResponse({
    status: 200,
    description: '獲取新聞分類列表成功',
    type: NewsCategoryLocalizedListResponseDto,
  })
  @ResponseMessage('獲取新聞分類列表成功')
  async findAll(@Headers('accept-language') language?: string) {
    return await this.newsCategoryService.findAll(language);
  }

  /**
   * [NC-02-A] 管理員取得所有新聞分類（不進行語系轉換）
   * 返回完整的雙語數據
   */
  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'NC-02-A 管理員取得所有新聞分類',
  })
  @ApiResponse({
    status: 200,
    description: '獲取新聞分類列表成功',
    type: NewsCategoryListResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('獲取新聞分類列表成功')
  async findAllByAdmin() {
    return await this.newsCategoryService.findAllByAdmin();
  }

  /**
   * [NC-03-A] 管理員取得單個新聞分類（不進行語系轉換）
   * 返回完整的雙語數據
   */
  @Get('admin/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'NC-03-A 管理員取得單個新聞分類',
  })
  @ApiResponse({
    status: 200,
    description: '獲取新聞分類詳情成功',
    type: NewsCategoryResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '新聞分類不存在' })
  @ResponseMessage('獲取新聞分類詳情成功')
  async findOneByAdmin(@Param('id') id: string) {
    return await this.newsCategoryService.findOneByAdmin(id);
  }

  /**
   * [NC-03-U] 取得單個新聞分類
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get(':id')
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'NC-03-U 取得單個新聞分類',
  })
  @ApiResponse({
    status: 200,
    description: '獲取新聞分類詳情成功',
    type: NewsCategoryLocalizedResponseDto,
  })
  @ApiResponse({ status: 404, description: '新聞分類不存在' })
  @ResponseMessage('獲取新聞分類詳情成功')
  async findOne(
    @Param('id') id: string,
    @Headers('accept-language') language?: string,
  ) {
    return await this.newsCategoryService.findOne(id, language);
  }

  /**
   * [NC-04] 更新新聞分類
   */
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'NC-04 更新新聞分類',
  })
  @ApiBody({ type: UpdateNewsCategoryDto })
  @ApiResponse({
    status: 200,
    description: '新聞分類更新成功',
    type: NewsCategoryResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '新聞分類不存在' })
  @ResponseMessage('新聞分類更新成功')
  async update(
    @Param('id') id: string,
    @Body() updateNewsCategoryDto: UpdateNewsCategoryDto,
  ) {
    return await this.newsCategoryService.update(id, updateNewsCategoryDto);
  }

  /**
   * [NC-05] 刪除新聞分類（軟刪除）
   */
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'NC-05 刪除新聞分類（軟刪除）',
  })
  @ApiResponse({
    status: 200,
    description: '新聞分類刪除成功',
    type: NewsCategoryDeleteResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '新聞分類不存在' })
  @ResponseMessage('新聞分類刪除成功')
  async remove(@Param('id') id: string) {
    return await this.newsCategoryService.remove(id);
  }
}
