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
  CaseService,
  FindAllByAdminParams,
  FindAllCaseParams,
} from './case.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import {
  CaseDeleteResponseDto,
  CaseListResponseDto,
  CaseLocalizedListResponseDto,
  CaseLocalizedResponseDto,
  CaseResponseDto,
} from './dto/case-response.dto';

@ApiTags('案例分享')
@Controller('cases')
@UseGuards(ThrottlerGuard)
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  /**
   * [CA-01] 建立案例
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CA-01 建立案例',
  })
  @ApiBody({ type: CreateCaseDto })
  @ApiResponse({
    status: 201,
    description: '案例創建成功',
    type: CaseResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('案例創建成功')
  async create(@Body() createCaseDto: CreateCaseDto) {
    return await this.caseService.create(createCaseDto);
  }

  /**
   * [CA-02-U] 取得所有案例（帶分頁和搜索）
   * @Query page - 頁碼（默認 1）
   * @Query limit - 每頁數量（默認 25）
   * @Query categoryId - 分類 ID 篩選
   * @Query query - 關鍵字搜索（搜索標題、描述、公司名稱、公司描述、標籤）
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get()
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'CA-02-U 取得所有案例',
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
    description: '關鍵字搜索（搜索標題、描述、公司名稱、公司描述、標籤）',
  })
  @ApiResponse({
    status: 200,
    description: '獲取案例列表成功',
    type: CaseLocalizedListResponseDto,
  })
  @ResponseMessage('獲取案例列表成功')
  async findAll(
    @Query() query: FindAllCaseParams,
    @Headers('accept-language') language?: string,
  ) {
    const params: FindAllCaseParams = {
      page: query.page ? Number(query.page) : undefined,
      limit: query.limit ? Number(query.limit) : undefined,
      categoryId: query.categoryId,
      query: query.query,
      language: language,
    };
    return await this.caseService.findAll(params);
  }

  /**
   * [CA-02] 管理員取得所有案例（帶分頁和搜索，不進行語系轉換）
   * @Query page - 頁碼（默認 1）
   * @Query limit - 每頁數量（默認 25）
   * @Query categoryId - 分類 ID 篩選
   * @Query query - 關鍵字搜索（搜索標題、描述、公司名稱、公司描述、標籤）
   * @Query status - 狀態篩選（Active, Draft, Closed）
   * 返回完整的雙語數據
   */
  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CA-02 管理員取得所有案例',
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
    description: '關鍵字搜索（搜索標題、描述、公司名稱、公司描述、標籤）',
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
    description: '獲取案例列表成功',
    type: CaseListResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('獲取案例列表成功')
  async findAllByAdmin(@Query() query: FindAllByAdminParams) {
    const params: FindAllByAdminParams = {
      page: query.page ? Number(query.page) : undefined,
      limit: query.limit ? Number(query.limit) : undefined,
      categoryId: query.categoryId,
      query: query.query,
      status: query.status,
      language: query.language,
    };
    return await this.caseService.findAllByAdmin(params);
  }

  /**
   * [CA-03] 管理員取得單個案例（不進行語系轉換）
   * 返回完整的雙語數據
   */
  @Get('admin/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CA-03 管理員取得單個案例',
  })
  @ApiResponse({
    status: 200,
    description: '獲取案例詳情成功',
    type: CaseResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '案例不存在' })
  @ResponseMessage('獲取案例詳情成功')
  async findOneByAdmin(@Param('id') id: string) {
    return await this.caseService.findOneByAdmin(id);
  }

  /**
   * [CA-03-U] 取得單個案例
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get(':id')
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'CA-03-U 取得單個案例',
  })
  @ApiResponse({
    status: 200,
    description: '獲取案例詳情成功',
    type: CaseLocalizedResponseDto,
  })
  @ApiResponse({ status: 404, description: '案例不存在' })
  @ResponseMessage('獲取案例詳情成功')
  async findOne(
    @Param('id') id: string,
    @Headers('accept-language') language?: string,
  ) {
    return await this.caseService.findOne(id, language);
  }

  /**
   * [CA-04] 更新案例
   */
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CA-04 更新案例',
  })
  @ApiBody({ type: UpdateCaseDto })
  @ApiResponse({
    status: 200,
    description: '案例更新成功',
    type: CaseResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '案例不存在' })
  @ResponseMessage('案例更新成功')
  async update(
    @Param('id') id: string,
    @Body() updateCaseDto: UpdateCaseDto,
  ) {
    return await this.caseService.update(id, updateCaseDto);
  }

  /**
   * [CA-05] 刪除案例
   */
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CA-05 刪除案例',
  })
  @ApiResponse({
    status: 200,
    description: '案例刪除成功',
    type: CaseDeleteResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '案例不存在' })
  @ResponseMessage('案例刪除成功')
  async remove(@Param('id') id: string) {
    return await this.caseService.remove(id);
  }
}
