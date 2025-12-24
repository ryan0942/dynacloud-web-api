import { ApiProperty } from '@nestjs/swagger';

export class ContactDto {
  @ApiProperty({
    description: '聯絡我們 ID',
    example: 'c1d2e3f4-a5b6-7890-cdef-123456789abc',
  })
  id: string;

  @ApiProperty({
    description: '姓名',
    example: '王小明',
  })
  name: string;

  @ApiProperty({
    description: '電子郵件',
    example: 'example@email.com',
  })
  email: string;

  @ApiProperty({
    description: '電話號碼',
    example: '0912345678',
  })
  phone: string;

  @ApiProperty({
    description: '留言內容',
    example: '我想詢問關於貴公司的服務...',
  })
  message: string;

  @ApiProperty({
    description: '建立時間',
    example: '2025-01-15T10:30:00.000Z',
    nullable: true,
  })
  createdAt: Date | null;

  @ApiProperty({
    description: '更新時間',
    example: '2025-01-15T15:45:00.000Z',
    nullable: true,
  })
  updatedAt: Date | null;
}

export class ContactResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => ContactDto,
  })
  result: ContactDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '聯絡表單提交成功',
  })
  message: string;
}

export class PaginationDto {
  @ApiProperty({
    description: '當前頁碼',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: '每頁數量',
    example: 25,
  })
  limit: number;

  @ApiProperty({
    description: '是否有下一頁',
    example: true,
  })
  has_next: boolean;

  @ApiProperty({
    description: '總記錄數',
    example: 100,
  })
  total: number;
}

export class ContactListDataDto {
  @ApiProperty({
    description: '聯絡表單列表',
    type: () => [ContactDto],
  })
  data: ContactDto[];

  @ApiProperty({
    description: '分頁資訊',
    type: () => PaginationDto,
  })
  pagination: PaginationDto;
}

export class ContactListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（含分頁）',
    type: () => ContactListDataDto,
  })
  result: ContactListDataDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取聯絡表單列表成功',
  })
  message: string;
}
