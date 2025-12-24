import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Status } from '@prisma/client';

export class CreateBlogDto {
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
    description: '中文標題',
    required: false,
  })
  @ValidateIf((o) => o.showInZh === true)
  @IsString()
  @IsNotEmpty()
  zh_title?: string;

  @ApiProperty({
    description: '英文標題',
    required: false,
  })
  @ValidateIf((o) => o.showInEn === true)
  @IsString()
  @IsNotEmpty()
  en_title?: string;

  @ApiProperty({
    description: '中文描述',
    required: false,
  })
  @ValidateIf((o) => o.showInZh === true)
  @IsString()
  @IsNotEmpty()
  zh_description?: string;

  @ApiProperty({
    description: '英文描述',
    required: false,
  })
  @ValidateIf((o) => o.showInEn === true)
  @IsString()
  @IsNotEmpty()
  en_description?: string;

  @ApiProperty({
    description: '封面圖片',
  })
  @IsString()
  @IsNotEmpty()
  cover: string;

  @ApiProperty({
    description: '分類 ID',
  })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    description: '中文內容（HTML格式）',
    required: false,
  })
  @ValidateIf((o) => o.showInZh === true)
  @IsString()
  @IsNotEmpty()
  zh_content?: string;

  @ApiProperty({
    description: '英文內容（HTML格式）',
    required: false,
  })
  @ValidateIf((o) => o.showInEn === true)
  @IsString()
  @IsNotEmpty()
  en_content?: string;

  @ApiProperty({
    description: '中文標籤（逗號分隔）',
    required: false,
  })
  @ValidateIf((o) => o.showInZh === true)
  @IsString()
  @IsNotEmpty()
  zh_tags?: string;

  @ApiProperty({
    description: '英文標籤（逗號分隔）',
    required: false,
  })
  @ValidateIf((o) => o.showInEn === true)
  @IsString()
  @IsNotEmpty()
  en_tags?: string;

  @ApiProperty({
    description: '狀態',
    enum: Status,
  })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}
