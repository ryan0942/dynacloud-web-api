import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBlogCategoryDto {
  @ApiProperty({
    description: '中文分類名稱'})
  @IsString()
  zh_name: string;

  @ApiProperty({
    description: '英文分類名稱'})
  @IsString()
  en_name: string;
}
