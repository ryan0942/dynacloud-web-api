import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty({
    description: '客戶 ID',
    example: '789e0123-d45e-67f8-a901-234567890abc',
  })
  id: string;

  @ApiProperty({
    description: '中文客戶名稱',
    example: '台積電',
  })
  zh_name: string;

  @ApiProperty({
    description: '英文客戶名稱',
    example: 'TSMC',
  })
  en_name: string;

  @ApiProperty({
    description: '客戶 Logo',
    example: 'https://example.com/logos/tsmc.png',
  })
  logo: string;

  @ApiProperty({
    description: '客戶網址',
    example: 'https://www.tsmc.com',
    nullable: true,
  })
  url: string | null;

  @ApiProperty({
    description: '排序順序',
    example: 1,
  })
  sortOrder: number;

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

export class CustomerLocalizedDto {
  @ApiProperty({
    description: '客戶 ID',
    example: '789e0123-d45e-67f8-a901-234567890abc',
  })
  id: string;

  @ApiProperty({
    description: '客戶名稱（根據語系顯示）',
    example: 'TSMC',
  })
  name: string;

  @ApiProperty({
    description: '客戶 Logo',
    example: 'https://example.com/logos/tsmc.png',
  })
  logo: string;

  @ApiProperty({
    description: '客戶網址',
    example: 'https://www.tsmc.com',
    nullable: true,
  })
  url: string | null;
}

export class CustomerResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => CustomerDto,
  })
  result: CustomerDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '合作客戶創建成功',
  })
  message: string;
}

export class CustomerListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => [CustomerDto],
    example: [
      {
        id: '789e0123-d45e-67f8-a901-234567890abc',
        zh_name: '台積電',
        en_name: 'TSMC',
        logo: 'https://example.com/logos/tsmc.png',
        url: 'https://www.tsmc.com',
        sortOrder: 1,
        createdAt: '2025-01-15T10:30:00.000Z',
        updatedAt: '2025-01-15T15:45:00.000Z',
      },
      {
        id: '889e0123-d45e-67f8-a901-234567890abd',
        zh_name: '鴻海',
        en_name: 'Foxconn',
        logo: 'https://example.com/logos/foxconn.png',
        url: 'https://www.foxconn.com',
        sortOrder: 2,
        createdAt: '2025-01-14T08:20:00.000Z',
        updatedAt: '2025-01-14T08:20:00.000Z',
      },
    ],
  })
  result: CustomerDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取合作客戶列表成功',
  })
  message: string;
}

export class CustomerLocalizedListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => [CustomerLocalizedDto],
    example: [
      {
        id: '789e0123-d45e-67f8-a901-234567890abc',
        name: 'TSMC',
        logo: 'https://example.com/logos/tsmc.png',
        url: 'https://www.tsmc.com',
      },
      {
        id: '889e0123-d45e-67f8-a901-234567890abd',
        name: 'Foxconn',
        logo: 'https://example.com/logos/foxconn.png',
        url: 'https://www.foxconn.com',
      },
    ],
  })
  result: CustomerLocalizedDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取合作客戶列表成功',
  })
  message: string;
}

export class CustomerLocalizedResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => CustomerLocalizedDto,
  })
  result: CustomerLocalizedDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取合作客戶詳情成功',
  })
  message: string;
}

export class CustomerDeleteResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    example: { message: '合作客戶已成功刪除' },
  })
  result: { message: string };

  @ApiProperty({
    description: '回傳訊息',
    example: '合作客戶刪除成功',
  })
  message: string;
}
