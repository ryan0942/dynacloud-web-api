import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateServiceDto {
  @ApiProperty({
    description: '是否在中文站顯示',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  showInZh?: boolean;

  @ApiProperty({
    description: '是否在英文站顯示',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  showInEn?: boolean;

  @ApiProperty({
    description: '服務圖示 URL',
    example: 'https://storage.googleapis.com/your-bucket/icons/cloud-icon.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({
    description: '服務標誌 URL',
    example: 'https://storage.googleapis.com/your-bucket/logos/cloud-logo.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  logo?: string;

  @ApiProperty({
    description: '服務封面圖 URL',
    example: 'https://storage.googleapis.com/your-bucket/covers/cloud-cover.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  cover?: string;

  @ApiProperty({
    description: '中文標題',
    example: '雲端服務',
    required: false,
  })
  @IsOptional()
  @IsString()
  zh_title?: string;

  @ApiProperty({
    description: '英文標題',
    example: 'Cloud Service',
    required: false,
  })
  @IsOptional()
  @IsString()
  en_title?: string;

  @ApiProperty({
    description: '中文描述',
    example: '提供完整的雲端解決方案',
    required: false,
  })
  @IsOptional()
  @IsString()
  zh_description?: string;

  @ApiProperty({
    description: '英文描述',
    example: 'Provide complete cloud solutions',
    required: false,
  })
  @IsOptional()
  @IsString()
  en_description?: string;

  @ApiProperty({
    description: '中文詳細內容',
    example: '<h2>雲端服務詳細介紹</h2><p>我們提供完整的雲端解決方案...</p>',
    required: false,
  })
  @IsOptional()
  @IsString()
  zh_content?: string;

  @ApiProperty({
    description: '英文詳細內容',
    example: '<h2>Cloud Service Details</h2><p>We provide complete cloud solutions...</p>',
    required: false,
  })
  @IsOptional()
  @IsString()
  en_content?: string;

  @ApiProperty({
    description: '服務分類 ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({
    description: '服務狀態',
    enum: Status,
    example: Status.Active,
    required: false,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
