import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateNewsCategoryDto {
  @ApiProperty({
    description: '中文分類名稱',
    required: false,
  })
  @IsString()
  @IsOptional()
  zh_name?: string;

  @ApiProperty({
    description: '英文分類名稱',
    required: false,
  })
  @IsString()
  @IsOptional()
  en_name?: string;
}
