import { ApiProperty } from '@nestjs/swagger';

export class NestedBlogCategoryDto {
  @ApiProperty({
    description: '分類 ID',
  })
  id: string;

  @ApiProperty({
    description: '中文分類名稱',
  })
  zh_name: string;

  @ApiProperty({
    description: '英文分類名稱',
  })
  en_name: string;
}

export class BlogDto {
  @ApiProperty({
    description: '部落格 ID',
  })
  id: string;

  @ApiProperty({
    description: '中文標題',
  })
  zh_title: string;

  @ApiProperty({
    description: '英文標題',
  })
  en_title: string;

  @ApiProperty({
    description: '中文描述',
  })
  zh_description: string;

  @ApiProperty({
    description: '英文描述',
  })
  en_description: string;

  @ApiProperty({
    description: '封面圖片',
  })
  cover: string;

  @ApiProperty({
    description: '分類 ID',
  })
  categoryId: string;

  @ApiProperty({
    description: '分類資訊',
    type: () => NestedBlogCategoryDto,
  })
  category: NestedBlogCategoryDto;

  @ApiProperty({
    description: '中文內容（HTML格式）',
  })
  zh_content: string;

  @ApiProperty({
    description: '英文內容（HTML格式）',
  })
  en_content: string;

  @ApiProperty({
    description: '中文標籤（逗號分隔）',
  })
  zh_tags: string;

  @ApiProperty({
    description: '英文標籤（逗號分隔）',
  })
  en_tags: string;

  @ApiProperty({
    description: '狀態',
    enum: ['Active', 'Draft', 'Closed'],
  })
  status: string;

  @ApiProperty({
    description: '建立時間',
    nullable: true,
  })
  createdAt: Date | null;

  @ApiProperty({
    description: '更新時間',
    nullable: true,
  })
  updatedAt: Date | null;
}

export class NestedBlogCategoryLocalizedDto {
  @ApiProperty({
    description: '分類 ID',
  })
  id: string;

  @ApiProperty({
    description: '分類名稱（根據語系顯示）',
  })
  name: string;
}

export class BlogLocalizedSummaryDto {
  @ApiProperty({
    description: '部落格 ID',
  })
  id: string;

  @ApiProperty({
    description: '標題（根據語系顯示）',
  })
  title: string;

  @ApiProperty({
    description: '描述（根據語系顯示）',
  })
  description: string;

  @ApiProperty({
    description: '封面圖片',
  })
  cover: string;

  @ApiProperty({
    description: '分類資訊',
    type: () => NestedBlogCategoryLocalizedDto,
  })
  category: NestedBlogCategoryLocalizedDto;

  @ApiProperty({
    description: '標籤（根據語系顯示，逗號分隔）',
  })
  tags: string;

  @ApiProperty({
    description: '狀態',
    enum: ['Active', 'Draft', 'Closed'],
  })
  status: string;
}

export class BlogLocalizedDto {
  @ApiProperty({
    description: '部落格 ID',
  })
  id: string;

  @ApiProperty({
    description: '標題（根據語系顯示）',
  })
  title: string;

  @ApiProperty({
    description: '描述（根據語系顯示）',
  })
  description: string;

  @ApiProperty({
    description: '封面圖片',
  })
  cover: string;

  @ApiProperty({
    description: '分類資訊',
    type: () => NestedBlogCategoryLocalizedDto,
  })
  category: NestedBlogCategoryLocalizedDto;

  @ApiProperty({
    description: '內容（HTML格式，根據語系顯示）',
  })
  content: string;

  @ApiProperty({
    description: '標籤（根據語系顯示，逗號分隔）',
  })
  tags: string;

  @ApiProperty({
    description: '狀態',
    enum: ['Active', 'Draft', 'Closed'],
  })
  status: string;
}

export class BlogResponseDto {
  @ApiProperty({
    description: '是否成功',
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => BlogDto,
  })
  result: BlogDto;

  @ApiProperty({
    description: '回傳訊息',
  })
  message: string;
}

export class BlogListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（完整多語系字段）',
    type: () => [BlogDto],
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        zh_title: 'AI 技術趨勢解析',
        en_title: 'AI Technology Trends Analysis',
        zh_description: '深入探討人工智慧技術的最新發展與應用趨勢',
        en_description: 'In-depth exploration of the latest developments and application trends in artificial intelligence technology',
        cover: 'https://example.com/blog/cover-ai-trends.jpg',
        categoryId: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
        category: {
          id: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
          zh_name: '技術趨勢',
          en_name: 'Tech Trends',
        },
        zh_content: '<h2>前言</h2><p>人工智慧技術正在快速發展...</p>',
        en_content: '<h2>Introduction</h2><p>Artificial intelligence technology is rapidly evolving...</p>',
        zh_tags: 'AI,機器學習,深度學習,技術趨勢',
        en_tags: 'AI,Machine Learning,Deep Learning,Tech Trends',
        status: 'Active',
        createdAt: '2025-01-15T10:30:00.000Z',
        updatedAt: '2025-01-15T15:45:00.000Z',
      },
    ],
  })
  result: BlogDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取部落格列表成功',
  })
  message: string;
}

export class BlogLocalizedListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後，不包含內容）',
    type: () => [BlogLocalizedSummaryDto],
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'AI Technology Trends Analysis',
        description: 'In-depth exploration of the latest developments and application trends in artificial intelligence technology',
        cover: 'https://example.com/blog/cover-ai-trends.jpg',
        category: {
          id: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
          name: 'Tech Trends',
        },
        tags: 'AI,Machine Learning,Deep Learning,Tech Trends',
        status: 'Active',
      },
    ],
  })
  result: BlogLocalizedSummaryDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取部落格列表成功',
  })
  message: string;
}

export class BlogLocalizedResponseDto {
  @ApiProperty({
    description: '是否成功',
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => BlogLocalizedDto,
  })
  result: BlogLocalizedDto;

  @ApiProperty({
    description: '回傳訊息',
  })
  message: string;
}

export class BlogDeleteResponseDto {
  @ApiProperty({
    description: '是否成功',
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
  })
  result: { message: string };

  @ApiProperty({
    description: '回傳訊息',
  })
  message: string;
}
