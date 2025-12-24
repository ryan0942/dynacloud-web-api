import { ApiProperty } from '@nestjs/swagger';
import { BannerType } from '@/types/common/status';

// 用戶端回傳格式（語系轉換後）
export class BannerLocalizedDto {
  @ApiProperty({
    description: 'Banner ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
  })
  id: string;

  @ApiProperty({
    description: 'Banner 圖片 URL',
    example: 'https://storage.googleapis.com/your-bucket/banners/banner-1.jpg',
    nullable: true,
  })
  image: string | null;

  @ApiProperty({
    description: 'Banner 影片 URL',
    example: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    nullable: true,
  })
  url: string | null;

  @ApiProperty({
    description: 'Banner 點擊連結',
    example: 'https://example.com/promotion',
    nullable: true,
  })
  link: string | null;

  @ApiProperty({
    description: 'Banner 顯示時長（秒）',
    example: 3,
    nullable: true,
  })
  duration: number | null;

  @ApiProperty({
    description: 'Banner 類型',
    enum: BannerType,
    example: BannerType.Image,
  })
  type: BannerType;
}

// 管理員回傳格式（完整資料）
export class BannerAdminDto {
  @ApiProperty({
    description: 'Banner ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
  })
  id: string;

  @ApiProperty({
    description: '是否在中文站顯示',
    example: true,
  })
  showInZh: boolean;

  @ApiProperty({
    description: '是否在英文站顯示',
    example: true,
  })
  showInEn: boolean;

  @ApiProperty({
    description: '中文版 Banner 圖片 URL',
    nullable: true,
  })
  zh_image: string | null;

  @ApiProperty({
    description: '中文版 Banner 影片 URL',
    nullable: true,
  })
  zh_url: string | null;

  @ApiProperty({
    description: '中文版 Banner 點擊連結',
    nullable: true,
  })
  zh_link: string | null;

  @ApiProperty({
    description: '英文版 Banner 圖片 URL',
    nullable: true,
  })
  en_image: string | null;

  @ApiProperty({
    description: '英文版 Banner 影片 URL',
    nullable: true,
  })
  en_url: string | null;

  @ApiProperty({
    description: '英文版 Banner 點擊連結',
    nullable: true,
  })
  en_link: string | null;

  @ApiProperty({
    description: 'Banner 顯示時長（秒）',
    example: 3,
    nullable: true,
  })
  duration: number | null;

  @ApiProperty({
    description: 'Banner 類型',
    enum: BannerType,
    example: BannerType.Image,
  })
  type: BannerType;

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

// 用戶端列表回應
export class BannerListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => [BannerLocalizedDto],
  })
  result: BannerLocalizedDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取 Banner 列表成功',
  })
  message: string;
}

// 管理員回應（單筆）
export class BannerResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => BannerAdminDto,
  })
  result: BannerAdminDto;

  @ApiProperty({
    description: '回傳訊息',
    example: 'Banner 創建成功',
  })
  message: string;
}

// 管理員列表回應
export class BannerAdminListResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => [BannerAdminDto],
  })
  result: BannerAdminDto[];

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取 Banner 列表成功',
  })
  message: string;
}

export class BannerDeleteResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    example: { message: 'Banner 已成功刪除' },
  })
  result: { message: string };

  @ApiProperty({
    description: '回傳訊息',
    example: 'Banner 刪除成功',
  })
  message: string;
}
