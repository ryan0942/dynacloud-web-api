import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: '中文客戶名稱'})
  @IsString()
  zh_name: string;

  @ApiProperty({
    description: '英文客戶名稱'})
  @IsString()
  en_name: string;

  @ApiProperty({
    description: '客戶 Logo'})
  @IsString()
  logo: string;

  @ApiProperty({
    description: '客戶網址',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  url?: string;
}
