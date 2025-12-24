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
}

export class ServiceDto {
  @ApiProperty({
    description: '服務 ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
  })
  id: string;

  @ApiProperty({
    description: '服務圖示 URL',
    example: 'https://storage.googleapis.com/your-bucket/icons/cloud-icon.png',
  })
  icon: string;

  @ApiProperty({
    description: '服務標誌 URL',
    example: 'https://storage.googleapis.com/your-bucket/logos/cloud-logo.png',
  })
  logo: string;

  @ApiProperty({
    description: '服務封面圖 URL',
    example: 'https://storage.googleapis.com/your-bucket/covers/cloud-cover.jpg',
  })
  cover: string;

  @ApiProperty({
    description: '中文標題',
    example: '雲端服務',
  })
  zh_title: string;

  @ApiProperty({
    description: '英文標題',
    example: 'Cloud Service',
  })
  en_title: string;

  @ApiProperty({
    description: '中文描述',
    example: '提供完整的雲端解決方案，包含基礎建設、資料備份與災難復原服務',
  })
  zh_description: string;

  @ApiProperty({
    description: '英文描述',
    example: 'Provide complete cloud solutions, including infrastructure, data backup and disaster recovery services',
  })
  en_description: string;

  @ApiProperty({
    description: '中文詳細內容',
    example: '<h2>雲端服務詳細介紹</h2><p>我們提供完整的雲端解決方案...</p>',
  })
  zh_content: string;

  @ApiProperty({
    description: '英文詳細內容',
    example: '<h2>Cloud Service Details</h2><p>We provide complete cloud solutions...</p>',
  })
  en_content: string;

  @ApiProperty({
    description: '服務分類 ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
  })
  categoryId: string;

  @ApiProperty({
    description: '服務分類資訊',
    type: () => ServiceCategoryDto,
  })
  category: ServiceCategoryDto;

  @ApiProperty({
    description: '服務狀態',
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

export class ServiceAdminDto {
  @ApiProperty({
    description: '服務 ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
  })
  id: string;

  @ApiProperty({
    description: '服務圖示 URL',
    example: 'https://storage.googleapis.com/your-bucket/icons/cloud-icon.png',
  })
  icon: string;

  @ApiProperty({
    description: '服務標誌 URL',
    example: 'https://storage.googleapis.com/your-bucket/logos/cloud-logo.png',
  })
  logo: string;

  @ApiProperty({
    description: '服務封面圖 URL',
    example: 'https://storage.googleapis.com/your-bucket/covers/cloud-cover.jpg',
  })
  cover: string;

  @ApiProperty({
    description: '中文標題',
    example: '雲端服務',
  })
  zh_title: string;

  @ApiProperty({
    description: '英文標題',
    example: 'Cloud Service',
  })
  en_title: string;

  @ApiProperty({
    description: '中文描述',
    example: '提供完整的雲端解決方案，包含基礎建設、資料備份與災難復原服務',
  })
  zh_description: string;

  @ApiProperty({
    description: '英文描述',
    example: 'Provide complete cloud solutions, including infrastructure, data backup and disaster recovery services',
  })
  en_description: string;

  @ApiProperty({
    description: '服務分類 ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
  })
  categoryId: string;

  @ApiProperty({
    description: '服務分類資訊',
    type: () => ServiceCategoryDto,
  })
  category: ServiceCategoryDto;

  @ApiProperty({
    description: '服務狀態',
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

export class ServiceLocalizedDto {
  @ApiProperty({
    description: '服務 ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
  })
  id: string;

  @ApiProperty({
    description: '服務圖示 URL',
    example: 'https://storage.googleapis.com/your-bucket/icons/cloud-icon.png',
  })
  icon: string;

  @ApiProperty({
    description: '服務標誌 URL',
    example: 'https://storage.googleapis.com/your-bucket/logos/cloud-logo.png',
  })
  logo: string;

  @ApiProperty({
    description: '服務封面圖 URL',
    example: 'https://storage.googleapis.com/your-bucket/covers/cloud-cover.jpg',
  })
  cover: string;

  @ApiProperty({
    description: '標題（根據語系顯示）',
    example: 'Cloud Service',
  })
  title: string;

  @ApiProperty({
    description: '描述（根據語系顯示）',
    example: 'Provide complete cloud solutions, including infrastructure, data backup and disaster recovery services',
  })
  description: string;

  @ApiProperty({
    description: '分類名稱（根據語系顯示）',
    example: 'Cloud Service',
  })
  categoryName: string;

  @ApiProperty({
    description: '建立時間',
    example: '2025-01-15 10:30',
  })
  createdAt: string;

  @ApiProperty({
    description: '更新時間',
    example: '2025-01-15 15:45',
  })
  updatedAt: string;
}

export class ServiceLocalizedDetailDto {
  @ApiProperty({
    description: '服務 ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
  })
  id: string;

  @ApiProperty({
    description: '服務圖示 URL',
    example: 'https://storage.googleapis.com/your-bucket/icons/cloud-icon.png',
  })
  icon: string;

  @ApiProperty({
    description: '服務標誌 URL',
    example: 'https://storage.googleapis.com/your-bucket/logos/cloud-logo.png',
  })
  logo: string;

  @ApiProperty({
    description: '服務封面圖 URL',
    example: 'https://storage.googleapis.com/your-bucket/covers/cloud-cover.jpg',
  })
  cover: string;

  @ApiProperty({
    description: '標題（根據語系顯示）',
    example: 'Cloud Service',
  })
  title: string;

  @ApiProperty({
    description: '描述（根據語系顯示）',
    example: 'Provide complete cloud solutions, including infrastructure, data backup and disaster recovery services',
  })
  description: string;

  @ApiProperty({
    description: '詳細內容（根據語系顯示）',
    example: '<h2>Cloud Service Details</h2><p>We provide complete cloud solutions...</p>',
  })
  content: string;

  @ApiProperty({
    description: '分類資訊（根據語系顯示）',
    example: {
      id: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
      name: 'Cloud Service',
    },
  })
  category: {
    id: string;
    name: string;
  };

  @ApiProperty({
    description: '服務狀態',
    enum: ['Active', 'Draft', 'Closed'],
    example: 'Active',
  })
  status: string;

  @ApiProperty({
    description: '更新時間',
    example: '2025-01-15T15:45:00.000Z',
    nullable: true,
  })
  updatedAt: Date | null;
}

export class ServiceResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => ServiceDto,
  })
  result: ServiceDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '產品服務創建成功',
  })
  message: string;
}

export class ServiceListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => [ServiceLocalizedDto],
    example: [
      {
        id: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
        icon: 'https://storage.googleapis.com/your-bucket/icons/cloud-icon.png',
        logo: 'https://storage.googleapis.com/your-bucket/logos/cloud-logo.png',
        cover: 'https://storage.googleapis.com/your-bucket/covers/cloud-cover.jpg',
        title: 'Cloud Service',
        description: 'Provide complete cloud solutions, including infrastructure, data backup and disaster recovery services',
        categoryName: 'Cloud Service',
        createdAt: '2025-01-15 10:30',
        updatedAt: '2025-01-15 15:45',
      },
      {
        id: '660bc9ee-fbc1-5gd1-c217-e0gcgb019671',
        icon: 'https://storage.googleapis.com/your-bucket/icons/ai-icon.png',
        logo: 'https://storage.googleapis.com/your-bucket/logos/ai-logo.png',
        cover: 'https://storage.googleapis.com/your-bucket/covers/ai-cover.jpg',
        title: 'AI Solution',
        description: 'Advanced artificial intelligence and machine learning solutions for business automation',
        categoryName: 'AI Solution',
        createdAt: '2025-01-14 09:20',
        updatedAt: '2025-01-14 14:35',
      },
    ],
  })
  result: ServiceLocalizedDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取產品服務列表成功',
  })
  message: string;
}

export class ServiceAdminListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（完整數據，未經語系轉換，不包含 content）',
    type: () => [ServiceAdminDto],
  })
  result: ServiceAdminDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取產品服務列表成功',
  })
  message: string;
}

export class ServiceLocalizedDetailResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => ServiceLocalizedDetailDto,
  })
  result: ServiceLocalizedDetailDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取產品服務詳情成功',
  })
  message: string;
}

export class ServiceDeleteResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    example: { message: '產品服務已成功刪除' },
  })
  result: { message: string };

  @ApiProperty({
    description: '回傳訊息',
    example: '產品服務刪除成功',
  })
  message: string;
}
