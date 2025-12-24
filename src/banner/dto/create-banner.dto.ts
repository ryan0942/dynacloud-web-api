import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { BannerType } from '@/types/common/status';

export class CreateBannerDto {
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
    description: '中文版 Banner 圖片 URL（IMAGE 類型且 showInZh 為 true 時必填）',
    required: false,
  })
  @ValidateIf((o) => o.showInZh === true && o.type === BannerType.Image)
  @IsString()
  @IsNotEmpty()
  zh_image?: string;

  @ApiProperty({
    description: '中文版 Banner 影片 URL（VIDEO 類型且 showInZh 為 true 時必填）',
    required: false,
  })
  @ValidateIf((o) => o.showInZh === true && o.type === BannerType.Video)
  @IsString()
  @IsNotEmpty()
  zh_url?: string;

  @ApiProperty({
    description: '中文版 Banner 點擊連結（非必填）',
    required: false,
  })
  @IsString()
  @IsOptional()
  zh_link?: string;

  @ApiProperty({
    description: '英文版 Banner 圖片 URL（IMAGE 類型且 showInEn 為 true 時必填）',
    required: false,
  })
  @ValidateIf((o) => o.showInEn === true && o.type === BannerType.Image)
  @IsString()
  @IsNotEmpty()
  en_image?: string;

  @ApiProperty({
    description: '英文版 Banner 影片 URL（VIDEO 類型且 showInEn 為 true 時必填）',
    required: false,
  })
  @ValidateIf((o) => o.showInEn === true && o.type === BannerType.Video)
  @IsString()
  @IsNotEmpty()
  en_url?: string;

  @ApiProperty({
    description: '英文版 Banner 點擊連結（非必填）',
    required: false,
  })
  @IsString()
  @IsOptional()
  en_link?: string;

  @ApiProperty({
    description: 'Banner 顯示時長（秒）',
    default: 3,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @ApiProperty({
    description: 'Banner 類型',
    enum: BannerType,
  })
  @IsEnum(BannerType)
  @IsNotEmpty()
  type: BannerType;
}
