import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { Status } from '@prisma/client';

export class CreateServiceDto {
  @ApiProperty({
    description: '是否在中文站顯示',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  showInZh?: boolean;

  @ApiProperty({
    description: '是否在英文站顯示',
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  showInEn?: boolean;

  @ApiProperty({
    description: '服務圖示 URL',
    example: 'https://storage.googleapis.com/your-bucket/icons/cloud-icon.png',
  })
  @IsNotEmpty()
  @IsString()
  icon: string;

  @ApiProperty({
    description: '服務標誌 URL',
    example: 'https://storage.googleapis.com/your-bucket/logos/cloud-logo.png',
  })
  @IsNotEmpty()
  @IsString()
  logo: string;

  @ApiProperty({
    description: '服務封面圖 URL',
    example: 'https://storage.googleapis.com/your-bucket/covers/cloud-cover.jpg',
  })
  @IsNotEmpty()
  @IsString()
  cover: string;

  @ApiProperty({
    description: '中文標題',
    example: '雲端服務',
    required: false,
  })
  @ValidateIf((o) => o.showInZh === true)
  @IsNotEmpty()
  @IsString()
  zh_title?: string;

  @ApiProperty({
    description: '英文標題',
    example: 'Cloud Service',
    required: false,
  })
  @ValidateIf((o) => o.showInEn === true)
  @IsNotEmpty()
  @IsString()
  en_title?: string;

  @ApiProperty({
    description: '中文描述',
    example: '提供完整的雲端解決方案，包含基礎建設、資料備份與災難復原服務',
    required: false,
  })
  @ValidateIf((o) => o.showInZh === true)
  @IsNotEmpty()
  @IsString()
  zh_description?: string;

  @ApiProperty({
    description: '英文描述',
    example:
      'Provide complete cloud solutions, including infrastructure, data backup and disaster recovery services',
    required: false,
  })
  @ValidateIf((o) => o.showInEn === true)
  @IsNotEmpty()
  @IsString()
  en_description?: string;

  @ApiProperty({
    description: '中文詳細內容',
    example: '<h2>雲端服務詳細介紹</h2><p>我們提供完整的雲端解決方案...</p>',
    required: false,
  })
  @ValidateIf((o) => o.showInZh === true)
  @IsNotEmpty()
  @IsString()
  zh_content?: string;

  @ApiProperty({
    description: '英文詳細內容',
    example: '<h2>Cloud Service Details</h2><p>We provide complete cloud solutions...</p>',
    required: false,
  })
  @ValidateIf((o) => o.showInEn === true)
  @IsNotEmpty()
  @IsString()
  en_content?: string;

  @ApiProperty({
    description: '服務分類 ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    description: '服務狀態',
    enum: Status,
    example: Status.Draft,
    required: false,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
