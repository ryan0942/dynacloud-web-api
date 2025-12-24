import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceCategoryDto {
  @ApiProperty({
    description: '中文分類名稱',
    example: '雲端服務',
  })
  @IsNotEmpty()
  @IsString()
  zh_name: string;

  @ApiProperty({
    description: '英文分類名稱',
    example: 'Cloud Service',
  })
  @IsNotEmpty()
  @IsString()
  en_name: string;
}
