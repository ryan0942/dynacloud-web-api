import { ApiProperty } from '@nestjs/swagger';

export class ServiceCategoryDto {
  @ApiProperty({
    description: '分類 ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
  })
  id: string;

  @ApiProperty({
    description: '中文分類名稱',
    example: '雲端服務',
  })
  zh_name: string;

  @ApiProperty({
    description: '英文分類名稱',
    example: 'Cloud Service',
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

export class ServiceCategoryLocalizedDto {
  @ApiProperty({
    description: '分類 ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
  })
  id: string;

  @ApiProperty({
    description: '分類名稱（根據語系顯示）',
    example: 'Cloud Service',
  })
  name: string;
}

export class ServiceCategoryResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => ServiceCategoryDto,
  })
  result: ServiceCategoryDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '服務分類創建成功',
  })
  message: string;
}

export class ServiceCategoryListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => [ServiceCategoryLocalizedDto],
    example: [
      {
        id: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
        name: 'Cloud Service',
      },
      {
        id: '660bc9ee-fbc1-5gd1-c217-e0gcgb019671',
        name: 'AI Solution',
      },
    ],
  })
  result: ServiceCategoryLocalizedDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取服務分類列表成功',
  })
  message: string;
}

export class ServiceCategoryAdminListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（完整數據，未經語系轉換）',
    type: () => [ServiceCategoryDto],
  })
  result: ServiceCategoryDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取服務分類列表成功',
  })
  message: string;
}

export class ServiceCategoryDeleteResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    example: { message: '服務分類已成功刪除' },
  })
  result: { message: string };

  @ApiProperty({
    description: '回傳訊息',
    example: '服務分類刪除成功',
  })
  message: string;
}
