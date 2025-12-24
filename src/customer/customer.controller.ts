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
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdateCustomerSortDto } from './dto/update-customer-sort.dto';
import {
  CustomerDeleteResponseDto,
  CustomerListResponseDto,
  CustomerLocalizedListResponseDto,
  CustomerLocalizedResponseDto,
  CustomerResponseDto,
} from './dto/customer-response.dto';

@ApiTags('合作客戶')
@Controller('customers')
@UseGuards(ThrottlerGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  /**
   * [CU-01] 建立合作客戶
   */
  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CU-01 建立合作客戶',
  })
  @ApiBody({ type: CreateCustomerDto })
  @ApiResponse({
    status: 201,
    description: '合作客戶創建成功',
    type: CustomerResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('合作客戶創建成功')
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.create(createCustomerDto);
  }

  /**
   * [CU-02-U] 取得所有合作客戶
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get()
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'CU-02-U 取得所有合作客戶',
  })
  @ApiResponse({
    status: 200,
    description: '獲取合作客戶列表成功',
    type: CustomerLocalizedListResponseDto,
  })
  @ResponseMessage('獲取合作客戶列表成功')
  async findAll(@Headers('accept-language') language?: string) {
    return await this.customerService.findAll(language);
  }

  /**
   * [CU-02] 管理員取得所有合作客戶（不進行語系轉換）
   * 返回完整的雙語數據
   */
  @Get('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CU-02 管理員取得所有合作客戶',
  })
  @ApiResponse({
    status: 200,
    description: '獲取合作客戶列表成功',
    type: CustomerListResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ResponseMessage('獲取合作客戶列表成功')
  async findAllByAdmin() {
    return await this.customerService.findAllByAdmin();
  }

  /**
   * [CU-03] 管理員取得單個合作客戶（不進行語系轉換）
   * 返回完整的雙語數據
   */
  @Get('admin/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CU-03 管理員取得單個合作客戶',
  })
  @ApiResponse({
    status: 200,
    description: '獲取合作客戶詳情成功',
    type: CustomerResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '合作客戶不存在' })
  @ResponseMessage('獲取合作客戶詳情成功')
  async findOneByAdmin(@Param('id') id: string) {
    return await this.customerService.findOneByAdmin(id);
  }

  /**
   * [CU-03-U] 取得單個合作客戶
   * 根據 Accept-Language header 返回對應語系的內容
   */
  @Get(':id')
  @ApiHeader({
    name: 'Accept-Language',
    required: false,
    description: '語言設定（zh-TW 或 en-US）',
  })
  @ApiOperation({
    summary: 'CU-03-U 取得單個合作客戶',
  })
  @ApiResponse({
    status: 200,
    description: '獲取合作客戶詳情成功',
    type: CustomerLocalizedResponseDto,
  })
  @ApiResponse({ status: 404, description: '合作客戶不存在' })
  @ResponseMessage('獲取合作客戶詳情成功')
  async findOne(
    @Param('id') id: string,
    @Headers('accept-language') language?: string,
  ) {
    return await this.customerService.findOne(id, language);
  }

  /**
   * [CU-04] 批次更新合作客戶排序
   * 注意：此路由必須放在 :id 路由之前，避免 'sort' 被當成 id
   */
  @Put('sort')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CU-04 批次更新合作客戶排序',
  })
  @ApiBody({ type: UpdateCustomerSortDto })
  @ApiResponse({
    status: 200,
    description: '合作客戶排序更新成功',
    type: CustomerListResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '合作客戶不存在' })
  @ResponseMessage('合作客戶排序更新成功')
  async updateSort(@Body() updateCustomerSortDto: UpdateCustomerSortDto) {
    return await this.customerService.updateSort(updateCustomerSortDto);
  }

  /**
   * [CU-05] 更新合作客戶
   */
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CU-05 更新合作客戶',
  })
  @ApiBody({ type: UpdateCustomerDto })
  @ApiResponse({
    status: 200,
    description: '合作客戶更新成功',
    type: CustomerResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '合作客戶不存在' })
  @ResponseMessage('合作客戶更新成功')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return await this.customerService.update(id, updateCustomerDto);
  }

  /**
   * [CU-06] 刪除合作客戶
   */
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'CU-06 刪除合作客戶',
  })
  @ApiResponse({
    status: 200,
    description: '合作客戶刪除成功',
    type: CustomerDeleteResponseDto,
  })
  @ApiResponse({ status: 401, description: '未授權' })
  @ApiResponse({ status: 404, description: '合作客戶不存在' })
  @ResponseMessage('合作客戶刪除成功')
  async remove(@Param('id') id: string) {
    return await this.customerService.remove(id);
  }
}
