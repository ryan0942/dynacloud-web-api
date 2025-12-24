import { ApiProperty } from '@nestjs/swagger';

export class NestedNewsCategoryDto {
  @ApiProperty({
    description: '分類 ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
  })
  id: string;

  @ApiProperty({
    description: '中文分類名稱',
    example: '媒體報導',
  })
  zh_name: string;

  @ApiProperty({
    description: '英文分類名稱',
    example: 'Media Coverage',
  })
  en_name: string;
}

export class NewsDto {
  @ApiProperty({
    description: '新聞 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: '中文標題',
    example: '2025年度科技創新論壇',
  })
  zh_title: string;

  @ApiProperty({
    description: '英文標題',
    example: '2025 Technology Innovation Forum',
  })
  en_title: string;

  @ApiProperty({
    description: '封面圖片',
    example: 'https://example.com/news/cover-tech-forum-2025.jpg',
  })
  cover: string;

  @ApiProperty({
    description: '中文描述',
    example: '探討最新科技趨勢與創新應用，匯聚業界專家分享實戰經驗',
  })
  zh_description: string;

  @ApiProperty({
    description: '英文描述',
    example: 'Explore the latest technology trends and innovative applications, bringing together industry experts to share practical experience',
  })
  en_description: string;

  @ApiProperty({
    description: '分類 ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
  })
  categoryId: string;

  @ApiProperty({
    description: '分類資訊',
    type: () => NestedNewsCategoryDto,
  })
  category: NestedNewsCategoryDto;

  @ApiProperty({
    description: '中文內容（HTML格式）',
    example: '<h2>活動簡介</h2><p>本次論壇將邀請國內外知名科技企業代表...</p>',
  })
  zh_content: string;

  @ApiProperty({
    description: '英文內容（HTML格式）',
    example: '<h2>Event Introduction</h2><p>This forum will invite representatives from well-known technology companies...</p>',
  })
  en_content: string;

  @ApiProperty({
    description: '中文標籤（逗號分隔）',
    example: '科技,創新,AI,論壇',
  })
  zh_tags: string;

  @ApiProperty({
    description: '英文標籤（逗號分隔）',
    example: 'Technology,Innovation,AI,Forum',
  })
  en_tags: string;

  @ApiProperty({
    description: '活動開始日期時間',
    example: '2025-03-15T09:00:00.000Z',
  })
  startDateTime: string;

  @ApiProperty({
    description: '活動結束日期時間',
    example: '2025-03-15T18:00:00.000Z',
  })
  endDateTime: string;

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

export class NestedNewsCategoryLocalizedDto {
  @ApiProperty({
    description: '分類 ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
  })
  id: string;

  @ApiProperty({
    description: '分類名稱（根據語系顯示）',
    example: 'Media Coverage',
  })
  name: string;
}

export class NewsLocalizedSummaryDto {
  @ApiProperty({
    description: '新聞 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: '標題（根據語系顯示）',
    example: '2025 Technology Innovation Forum',
  })
  title: string;

  @ApiProperty({
    description: '封面圖片',
    example: 'https://example.com/news/cover-tech-forum-2025.jpg',
  })
  cover: string;

  @ApiProperty({
    description: '描述（根據語系顯示）',
    example: 'Explore the latest technology trends and innovative applications',
  })
  description: string;

  @ApiProperty({
    description: '分類資訊',
    type: () => NestedNewsCategoryLocalizedDto,
  })
  category: NestedNewsCategoryLocalizedDto;

  @ApiProperty({
    description: '標籤（根據語系顯示，逗號分隔）',
    example: 'Technology,Innovation,AI,Forum',
  })
  tags: string;

  @ApiProperty({
    description: '活動開始日期時間',
    example: '2025-03-15T09:00:00.000Z',
  })
  startDateTime: string;

  @ApiProperty({
    description: '活動結束日期時間',
    example: '2025-03-15T18:00:00.000Z',
  })
  endDateTime: string;

  @ApiProperty({
    description: '狀態',
    enum: ['Active', 'Draft', 'Closed'],
    example: 'Active',
  })
  status: string;
}

export class NewsLocalizedDto {
  @ApiProperty({
    description: '新聞 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: '標題（根據語系顯示）',
    example: '2025 Technology Innovation Forum',
  })
  title: string;

  @ApiProperty({
    description: '封面圖片',
    example: 'https://example.com/news/cover-tech-forum-2025.jpg',
  })
  cover: string;

  @ApiProperty({
    description: '描述（根據語系顯示）',
    example: 'Explore the latest technology trends and innovative applications',
  })
  description: string;

  @ApiProperty({
    description: '分類資訊',
    type: () => NestedNewsCategoryLocalizedDto,
  })
  category: NestedNewsCategoryLocalizedDto;

  @ApiProperty({
    description: '內容（HTML格式，根據語系顯示）',
    example: '<h2>Event Introduction</h2><p>This forum will invite representatives...</p>',
  })
  content: string;

  @ApiProperty({
    description: '標籤（根據語系顯示，逗號分隔）',
    example: 'Technology,Innovation,AI,Forum',
  })
  tags: string;

  @ApiProperty({
    description: '活動開始日期時間',
    example: '2025-03-15T09:00:00.000Z',
  })
  startDateTime: string;

  @ApiProperty({
    description: '活動結束日期時間',
    example: '2025-03-15T18:00:00.000Z',
  })
  endDateTime: string;

  @ApiProperty({
    description: '狀態',
    enum: ['Active', 'Draft', 'Closed'],
    example: 'Active',
  })
  status: string;
}

export class NewsResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => NewsDto,
  })
  result: NewsDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '新聞創建成功',
  })
  message: string;
}

export class NewsListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（完整多語系字段）',
    type: () => [NewsDto],
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        zh_title: '2025年度科技創新論壇',
        en_title: '2025 Technology Innovation Forum',
        cover: 'https://example.com/news/cover-tech-forum-2025.jpg',
        zh_description: '探討最新科技趨勢與創新應用，匯聚業界專家分享實戰經驗',
        en_description: 'Explore the latest technology trends and innovative applications, bringing together industry experts to share practical experience',
        categoryId: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
        category: {
          id: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
          zh_name: '媒體報導',
          en_name: 'Media Coverage',
        },
        zh_content: '<h2>活動簡介</h2><p>本次論壇將邀請國內外知名科技企業代表...</p>',
        en_content: '<h2>Event Introduction</h2><p>This forum will invite representatives from well-known technology companies...</p>',
        zh_tags: '科技,創新,AI,論壇',
        en_tags: 'Technology,Innovation,AI,Forum',
        startDateTime: '2025-03-15T09:00:00.000Z',
        endDateTime: '2025-03-15T18:00:00.000Z',
        status: 'Active',
        createdAt: '2025-01-15T10:30:00.000Z',
        updatedAt: '2025-01-15T15:45:00.000Z',
      },
    ],
  })
  result: NewsDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取新聞列表成功',
  })
  message: string;
}

export class NewsLocalizedListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後，不包含內容）',
    type: () => [NewsLocalizedSummaryDto],
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: '2025 Technology Innovation Forum',
        cover: 'https://example.com/news/cover-tech-forum-2025.jpg',
        description: 'Explore the latest technology trends',
        category: {
          id: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
          name: 'Media Coverage',
        },
        tags: 'Technology,Innovation,AI,Forum',
        startDateTime: '2025-03-15T09:00:00.000Z',
        endDateTime: '2025-03-15T18:00:00.000Z',
        status: 'Active',
      },
    ],
  })
  result: NewsLocalizedSummaryDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取新聞列表成功',
  })
  message: string;
}

export class NewsLocalizedResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => NewsLocalizedDto,
  })
  result: NewsLocalizedDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取新聞詳情成功',
  })
  message: string;
}

export class NewsDeleteResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    example: { message: '新聞已成功刪除' },
  })
  result: { message: string };

  @ApiProperty({
    description: '回傳訊息',
    example: '新聞刪除成功',
  })
  message: string;
}
