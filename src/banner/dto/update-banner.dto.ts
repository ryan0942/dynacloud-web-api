import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BannerType } from '@/types/common/status';

export class UpdateBannerDto {
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
    description: '中文版 Banner 圖片 URL',
    required: false,
  })
  @IsString()
  @IsOptional()
  zh_image?: string;

  @ApiProperty({
    description: '中文版 Banner 影片 URL',
    required: false,
  })
  @IsString()
  @IsOptional()
  zh_url?: string;

  @ApiProperty({
    description: '中文版 Banner 點擊連結',
    required: false,
  })
  @IsString()
  @IsOptional()
  zh_link?: string;

  @ApiProperty({
    description: '英文版 Banner 圖片 URL',
    required: false,
  })
  @IsString()
  @IsOptional()
  en_image?: string;

  @ApiProperty({
    description: '英文版 Banner 影片 URL',
    required: false,
  })
  @IsString()
  @IsOptional()
  en_url?: string;

  @ApiProperty({
    description: '英文版 Banner 點擊連結',
    required: false,
  })
  @IsString()
  @IsOptional()
  en_link?: string;

  @ApiProperty({
    description: 'Banner 顯示時長（秒）',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @ApiProperty({
    description: 'Banner 類型',
    enum: BannerType,
    required: false,
  })
  @IsEnum(BannerType)
  @IsOptional()
  type?: BannerType;
}
