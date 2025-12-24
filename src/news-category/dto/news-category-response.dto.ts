import { ApiProperty } from '@nestjs/swagger';

export class NewsCategoryDto {
  @ApiProperty({
    description: '分類 ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
  })
  id: string;

  @ApiProperty({
    description: '中文分類名稱',
    example: '企業動態',
  })
  zh_name: string;

  @ApiProperty({
    description: '英文分類名稱',
    example: 'Company News',
  })
  en_name: string;

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

  @ApiProperty({
    description: '刪除時間（軟刪除）',
    example: null,
    nullable: true,
  })
  deletedAt: Date | null;
}

export class NewsCategoryLocalizedDto {
  @ApiProperty({
    description: '分類 ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
  })
  id: string;

  @ApiProperty({
    description: '分類名稱（根據語系顯示）',
    example: 'Company News',
  })
  name: string;
}

export class NewsCategoryResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => NewsCategoryDto,
  })
  result: NewsCategoryDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '新聞分類創建成功',
  })
  message: string;
}

export class NewsCategoryListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => [NewsCategoryDto],
    example: [
      {
        id: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
        zh_name: '企業動態',
        en_name: 'Company News',
        createdAt: '2025-01-15T10:30:00.000Z',
        updatedAt: '2025-01-15T15:45:00.000Z',
        deletedAt: null,
      },
      {
        id: '660bc9ee-fbc1-5gd1-c217-e0gcgb019671',
        zh_name: '產品發布',
        en_name: 'Product Launch',
        createdAt: '2025-01-14T08:20:00.000Z',
        updatedAt: '2025-01-14T08:20:00.000Z',
        deletedAt: null,
      },
    ],
  })
  result: NewsCategoryDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取新聞分類列表成功',
  })
  message: string;
}

export class NewsCategoryLocalizedListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => [NewsCategoryLocalizedDto],
    example: [
      {
        id: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
        name: 'Company News',
      },
      {
        id: '660bc9ee-fbc1-5gd1-c217-e0gcgb019671',
        name: 'Product Launch',
      },
    ],
  })
  result: NewsCategoryLocalizedDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取新聞分類列表成功',
  })
  message: string;
}

export class NewsCategoryLocalizedResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => NewsCategoryLocalizedDto,
  })
  result: NewsCategoryLocalizedDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取新聞分類詳情成功',
  })
  message: string;
}

export class NewsCategoryDeleteResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    example: { message: '新聞分類已成功刪除' },
  })
  result: { message: string };

  @ApiProperty({
    description: '回傳訊息',
    example: '新聞分類刪除成功',
  })
  message: string;
}
