import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateNewsDto {
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
    description: '中文標題',
    required: false,
  })
  @IsString()
  @IsOptional()
  zh_title?: string;

  @ApiProperty({
    description: '英文標題',
    required: false,
  })
  @IsString()
  @IsOptional()
  en_title?: string;

  @ApiProperty({
    description: '封面圖片',
    required: false,
  })
  @IsString()
  @IsOptional()
  cover?: string;

  @ApiProperty({
    description: '中文描述',
    required: false,
  })
  @IsString()
  @IsOptional()
  zh_description?: string;

  @ApiProperty({
    description: '英文描述',
    required: false,
  })
  @IsString()
  @IsOptional()
  en_description?: string;

  @ApiProperty({
    description: '分類 ID',
    required: false,
  })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiProperty({
    description: '中文內容（HTML格式）',
    required: false,
  })
  @IsString()
  @IsOptional()
  zh_content?: string;

  @ApiProperty({
    description: '英文內容（HTML格式）',
    required: false,
  })
  @IsString()
  @IsOptional()
  en_content?: string;

  @ApiProperty({
    description: '中文標籤（逗號分隔）',
    required: false,
  })
  @IsString()
  @IsOptional()
  zh_tags?: string;

  @ApiProperty({
    description: '英文標籤（逗號分隔）',
    required: false,
  })
  @IsString()
  @IsOptional()
  en_tags?: string;

  @ApiProperty({
    description: '活動開始日期時間',
    required: false,
  })
  @IsString()
  @IsOptional()
  startDateTime?: string;

  @ApiProperty({
    description: '活動結束日期時間',
    required: false,
  })
  @IsString()
  @IsOptional()
  endDateTime?: string;

  @ApiProperty({
    description: '狀態',
    enum: Status,
    required: false,
  })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}
