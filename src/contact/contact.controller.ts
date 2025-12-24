import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ResponseMessage } from '../common/decorators/response-message.decorator';
import { ContactService, FindAllContactParams } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import {
  ContactListResponseDto,
  ContactResponseDto,
} from './dto/contact-response.dto';

@ApiTags('聯絡我們')
@Controller('contact')
@UseGuards(ThrottlerGuard)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  /**
   * [CT-01-U] 提交聯絡表單（公開接口）
   */
  @Post()
  @ApiOperation({
    summary: 'CT-01-U 提交聯絡表單',
  })
  @ApiBody({ type: CreateContactDto })
  @ApiResponse({
    status: 201,
    description: '聯絡表單提交成功',
    type: ContactResponseDto,
  })
  @ResponseMessage('聯絡表單提交成功')
  async create(@Body() createContactDto: CreateContactDto) {
    return await this.contactService.create(createContactDto);
  }

  /**
   * [CT-02] 管理員取得所有聯絡表單（帶分頁和搜索）
   * @Query page - 頁碼（默認 1）
   * @Query limit - 每頁數量（默認 25）
   * @Query query - 關鍵字搜索（搜索 name, email, phone, message）
   */
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CT-02 管理員取得所有聯絡表單',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: '頁碼' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: '每頁數量' })
  @ApiQuery({ name: 'query', required: false, type: String, description: '搜索關鍵字（搜索 name, email, phone, message）' })
  @ApiResponse({
    status: 200,
    description: '獲取聯絡表單列表成功',
    type: ContactListResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('獲取聯絡表單列表成功')
  async findAll(@Query() query: FindAllContactParams) {
    const params: FindAllContactParams = {
      page: query.page ? Number(query.page) : undefined,
      limit: query.limit ? Number(query.limit) : undefined,
      query: query.query,
    };
    return await this.contactService.findAll(params);
  }

  /**
   * [CT-03] 管理員根據 ID 取得單一聯絡表單
   */
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CT-03 管理員根據 ID 取得單一聯絡表單',
  })
  @ApiParam({
    name: 'id',
    description: '聯絡表單 ID',
  })
  @ApiResponse({
    status: 200,
    description: '獲取聯絡表單成功',
    type: ContactResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '聯絡表單不存在' })
  @ResponseMessage('獲取聯絡表單成功')
  async findOne(@Param('id') id: string) {
    return await this.contactService.findOne(id);
  }

  /**
   * [CT-04] 管理員刪除聯絡表單
   */
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CT-04 管理員刪除聯絡表單',
  })
  @ApiParam({
    name: 'id',
    description: '聯絡表單 ID',
  })
  @ApiResponse({
    status: 200,
    description: '聯絡表單刪除成功',
    type: ContactResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '聯絡表單不存在' })
  @ResponseMessage('聯絡表單刪除成功')
  async remove(@Param('id') id: string) {
    return await this.contactService.remove(id);
  }
}
