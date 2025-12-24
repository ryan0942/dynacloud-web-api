import { ApiProperty } from '@nestjs/swagger';

export class NestedCaseCategoryDto {
  @ApiProperty({
    description: '分類 ID',
    example: '750ac8ff-eab0-4fc0-b106-d9fbfa908562',
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
}

export class CaseDto {
  @ApiProperty({
    description: '案例 ID',
    example: '345e6789-a01b-34d5-c678-648836396222',
  })
  id: string;

  @ApiProperty({
    description: '中文標題',
    example: '台積電智慧製造數位轉型專案',
  })
  zh_title: string;

  @ApiProperty({
    description: '英文標題',
    example: 'TSMC Smart Manufacturing Digital Transformation Project',
  })
  en_title: string;

  @ApiProperty({
    description: '中文描述',
    example: '協助台積電建置智慧製造系統，提升生產效率30%',
  })
  zh_description: string;

  @ApiProperty({
    description: '英文描述',
    example: 'Assisted TSMC in building a smart manufacturing system',
  })
  en_description: string;

  @ApiProperty({
    description: '封面圖片',
    example: 'https://example.com/case/cover-tsmc-smart-manufacturing.jpg',
  })
  cover: string;

  @ApiProperty({
    description: '公司 Logo',
    example: 'https://example.com/logos/tsmc-logo.png',
  })
  company_logo: string;

  @ApiProperty({
    description: '中文公司名稱',
    example: '台灣積體電路製造股份有限公司',
  })
  zh_company_name: string;

  @ApiProperty({
    description: '英文公司名稱',
    example: 'Taiwan Semiconductor Manufacturing Company Limited',
  })
  en_company_name: string;

  @ApiProperty({
    description: '中文公司描述',
    example: '全球最大的專業積體電路製造服務公司',
  })
  zh_company_description: string;

  @ApiProperty({
    description: '英文公司描述',
    example: 'The world\'s largest dedicated semiconductor foundry',
  })
  en_company_description: string;

  @ApiProperty({
    description: '中文公司職稱',
    example: '資訊長',
  })
  zh_company_title: string;

  @ApiProperty({
    description: '英文公司職稱',
    example: 'Chief Information Officer',
  })
  en_company_title: string;

  @ApiProperty({
    description: '中文標籤（逗號分隔）',
    example: '智慧製造,數位轉型,半導體,生產效率',
  })
  zh_tags: string;

  @ApiProperty({
    description: '英文標籤（逗號分隔）',
    example: 'Smart Manufacturing,Digital Transformation,Semiconductor,Production Efficiency',
  })
  en_tags: string;

  @ApiProperty({
    description: '中文內容',
    example: '<p>台積電智慧製造專案的詳細內容...</p>',
  })
  zh_content: string;

  @ApiProperty({
    description: '英文內容',
    example: '<p>Detailed content of TSMC smart manufacturing project...</p>',
  })
  en_content: string;

  @ApiProperty({
    description: '分類 ID',
    example: '750ac8ff-eab0-4fc0-b106-d9fbfa908562',
  })
  categoryId: string;

  @ApiProperty({
    description: '分類資訊',
    type: () => NestedCaseCategoryDto,
  })
  category: NestedCaseCategoryDto;

  @ApiProperty({
    description: '狀態',
    enum: ['Active', 'Draft', 'Closed'],
    example: 'Active',
  })
  status: string;

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

export class NestedCaseCategoryLocalizedDto {
  @ApiProperty({
    description: '分類 ID',
    example: '750ac8ff-eab0-4fc0-b106-d9fbfa908562',
  })
  id: string;

  @ApiProperty({
    description: '分類名稱（根據語系顯示）',
    example: 'Smart Manufacturing',
  })
  name: string;
}

export class CaseLocalizedDto {
  @ApiProperty({
    description: '案例 ID',
    example: '345e6789-a01b-34d5-c678-648836396222',
  })
  id: string;

  @ApiProperty({
    description: '標題（根據語系顯示）',
    example: 'TSMC Smart Manufacturing Digital Transformation Project',
  })
  title: string;

  @ApiProperty({
    description: '描述（根據語系顯示）',
    example: 'Assisted TSMC in building a smart manufacturing system',
  })
  description: string;

  @ApiProperty({
    description: '封面圖片',
    example: 'https://example.com/case/cover-tsmc-smart-manufacturing.jpg',
  })
  cover: string;

  @ApiProperty({
    description: '公司 Logo',
    example: 'https://example.com/logos/tsmc-logo.png',
  })
  company_logo: string;

  @ApiProperty({
    description: '公司名稱（根據語系顯示）',
    example: 'Taiwan Semiconductor Manufacturing Company Limited',
  })
  company_name: string;

  @ApiProperty({
    description: '公司描述（根據語系顯示）',
    example: 'The world\'s largest dedicated semiconductor foundry',
  })
  company_description: string;

  @ApiProperty({
    description: '公司職稱（根據語系顯示）',
    example: 'Chief Information Officer',
  })
  company_title: string;

  @ApiProperty({
    description: '標籤（根據語系顯示，逗號分隔）',
    example: 'Smart Manufacturing,Digital Transformation,Semiconductor,Production Efficiency',
  })
  tags: string;

  @ApiProperty({
    description: '內容（根據語系顯示）',
    example: '<p>Detailed content of TSMC smart manufacturing project...</p>',
  })
  content: string;

  @ApiProperty({
    description: '分類資訊',
    type: () => NestedCaseCategoryLocalizedDto,
  })
  category: NestedCaseCategoryLocalizedDto;

  @ApiProperty({
    description: '狀態',
    enum: ['Active', 'Draft', 'Closed'],
    example: 'Active',
  })
  status: string;
}

export class CaseResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => CaseDto,
  })
  result: CaseDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '案例創建成功',
  })
  message: string;
}

export class CaseListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => [CaseDto],
    example: [
      {
        id: '345e6789-a01b-34d5-c678-648836396222',
        zh_title: '台積電智慧製造數位轉型專案',
        en_title: 'TSMC Smart Manufacturing Digital Transformation Project',
        zh_description: '協助台積電建置智慧製造系統',
        en_description: 'Assisted TSMC in building a smart manufacturing system',
        cover: 'https://example.com/case/cover-tsmc-smart-manufacturing.jpg',
        company_logo: 'https://example.com/logos/tsmc-logo.png',
        zh_company_name: '台灣積體電路製造股份有限公司',
        en_company_name: 'Taiwan Semiconductor Manufacturing Company Limited',
        zh_company_description: '全球最大的專業積體電路製造服務公司',
        en_company_description: 'The world\'s largest dedicated semiconductor foundry',
        zh_company_title: '資訊長',
        en_company_title: 'Chief Information Officer',
        zh_tags: '智慧製造,數位轉型,半導體,生產效率',
        en_tags: 'Smart Manufacturing,Digital Transformation,Semiconductor,Production Efficiency',
        categoryId: '750ac8ff-eab0-4fc0-b106-d9fbfa908562',
        category: {
          id: '750ac8ff-eab0-4fc0-b106-d9fbfa908562',
          zh_name: '智慧製造',
          en_name: 'Smart Manufacturing',
        },
        status: 'Active',
        createdAt: '2025-01-15T10:30:00.000Z',
        updatedAt: '2025-01-15T15:45:00.000Z',
      },
    ],
  })
  result: CaseDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取案例列表成功',
  })
  message: string;
}

export class CaseLocalizedListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => [CaseLocalizedDto],
    example: [
      {
        id: '345e6789-a01b-34d5-c678-648836396222',
        title: 'TSMC Smart Manufacturing Digital Transformation Project',
        description: 'Assisted TSMC in building a smart manufacturing system',
        cover: 'https://example.com/case/cover-tsmc-smart-manufacturing.jpg',
        company_logo: 'https://example.com/logos/tsmc-logo.png',
        company_name: 'Taiwan Semiconductor Manufacturing Company Limited',
        company_description: 'The world\'s largest dedicated semiconductor foundry',
        company_title: 'Chief Information Officer',
        tags: 'Smart Manufacturing,Digital Transformation,Semiconductor,Production Efficiency',
        category: {
          id: '750ac8ff-eab0-4fc0-b106-d9fbfa908562',
          name: 'Smart Manufacturing',
        },
        status: 'Active',
      },
    ],
  })
  result: CaseLocalizedDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取案例列表成功',
  })
  message: string;
}

export class CaseLocalizedResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => CaseLocalizedDto,
  })
  result: CaseLocalizedDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取案例詳情成功',
  })
  message: string;
}

export class CaseDeleteResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    example: { message: '案例已成功刪除' },
  })
  result: { message: string };

  @ApiProperty({
    description: '回傳訊息',
    example: '案例刪除成功',
  })
  message: string;
}
