import { ApiProperty } from '@nestjs/swagger';

export class BlogCategoryDto {
  @ApiProperty({
    description: '分類 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: '中文分類名稱',
    example: '技術分享',
  })
  zh_name: string;

  @ApiProperty({
    description: '英文分類名稱',
    example: 'Technical Insights',
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
}

export class BlogCategoryLocalizedDto {
  @ApiProperty({
    description: '分類 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: '分類名稱（根據語系顯示）',
    example: 'Technical Insights',
  })
  name: string;
}

export class BlogCategoryResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => BlogCategoryDto,
  })
  result: BlogCategoryDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '部落格分類創建成功',
  })
  message: string;
}

export class BlogCategoryListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => [BlogCategoryDto],
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        zh_name: '技術分享',
        en_name: 'Technical Insights',
        createdAt: '2025-01-15T10:30:00.000Z',
        updatedAt: '2025-01-15T15:45:00.000Z',
      },
      {
        id: '223e4567-e89b-12d3-a456-426614174001',
        zh_name: '產業趨勢',
        en_name: 'Industry Trends',
        createdAt: '2025-01-14T08:20:00.000Z',
        updatedAt: '2025-01-14T08:20:00.000Z',
      },
    ],
  })
  result: BlogCategoryDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取部落格分類列表成功',
  })
  message: string;
}

export class BlogCategoryLocalizedListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => [BlogCategoryLocalizedDto],
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Technical Insights',
      },
      {
        id: '223e4567-e89b-12d3-a456-426614174001',
        name: 'Industry Trends',
      },
    ],
  })
  result: BlogCategoryLocalizedDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取部落格分類列表成功',
  })
  message: string;
}

export class BlogCategoryLocalizedResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => BlogCategoryLocalizedDto,
  })
  result: BlogCategoryLocalizedDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取部落格分類詳情成功',
  })
  message: string;
}

export class BlogCategoryDeleteResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    example: { message: '部落格分類已成功刪除' },
  })
  result: { message: string };

  @ApiProperty({
    description: '回傳訊息',
    example: '部落格分類刪除成功',
  })
  message: string;
}
