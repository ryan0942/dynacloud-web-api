import { ApiProperty } from '@nestjs/swagger';

export class CaseCategoryDto {
  @ApiProperty({
    description: '分類 ID',
    example: '456e7890-f12b-34c5-d678-901234567890',
  })
  id: string;

  @ApiProperty({
    description: '中文分類名稱',
    example: '智慧製造',
  })
  zh_name: string;

  @ApiProperty({
    description: '英文分類名稱',
    example: 'Smart Manufacturing',
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

export class CaseCategoryLocalizedDto {
  @ApiProperty({
    description: '分類 ID',
    example: '456e7890-f12b-34c5-d678-901234567890',
  })
  id: string;

  @ApiProperty({
    description: '分類名稱（根據語系顯示）',
    example: 'Smart Manufacturing',
  })
  name: string;
}

export class CaseCategoryResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => CaseCategoryDto,
  })
  result: CaseCategoryDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '案例分類創建成功',
  })
  message: string;
}

export class CaseCategoryListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => [CaseCategoryDto],
    example: [
      {
        id: '456e7890-f12b-34c5-d678-901234567890',
        zh_name: '智慧製造',
        en_name: 'Smart Manufacturing',
        createdAt: '2025-01-15T10:30:00.000Z',
        updatedAt: '2025-01-15T15:45:00.000Z',
      },
      {
        id: '556e7890-f12b-34c5-d678-901234567891',
        zh_name: '數位轉型',
        en_name: 'Digital Transformation',
        createdAt: '2025-01-14T08:20:00.000Z',
        updatedAt: '2025-01-14T08:20:00.000Z',
      },
    ],
  })
  result: CaseCategoryDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取案例分類列表成功',
  })
  message: string;
}

export class CaseCategoryLocalizedListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => [CaseCategoryLocalizedDto],
    example: [
      {
        id: '456e7890-f12b-34c5-d678-901234567890',
        name: 'Smart Manufacturing',
      },
      {
        id: '556e7890-f12b-34c5-d678-901234567891',
        name: 'Digital Transformation',
      },
    ],
  })
  result: CaseCategoryLocalizedDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取案例分類列表成功',
  })
  message: string;
}

export class CaseCategoryLocalizedResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => CaseCategoryLocalizedDto,
  })
  result: CaseCategoryLocalizedDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取案例分類詳情成功',
  })
  message: string;
}

export class CaseCategoryDeleteResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    example: { message: '案例分類已成功刪除' },
  })
  result: { message: string };

  @ApiProperty({
    description: '回傳訊息',
    example: '案例分類刪除成功',
  })
  message: string;
}
