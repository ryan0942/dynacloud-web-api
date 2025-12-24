import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateServiceCategoryDto {
  @ApiProperty({
    description: '中文分類名稱',
    example: '雲端服務',
    required: false,
  })
  @IsOptional()
  @IsString()
  zh_name?: string;

  @ApiProperty({
    description: '英文分類名稱',
    example: 'Cloud Service',
    required: false,
  })
  @IsOptional()
  @IsString()
  en_name?: string;
}
