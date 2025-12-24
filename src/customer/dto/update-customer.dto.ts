import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateCustomerDto {
  @ApiProperty({
    description: '中文客戶名稱',
    required: false,
  })
  @IsString()
  @IsOptional()
  zh_name?: string;

  @ApiProperty({
    description: '英文客戶名稱',
    required: false,
  })
  @IsString()
  @IsOptional()
  en_name?: string;

  @ApiProperty({
    description: '客戶 Logo',
    required: false,
  })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiProperty({
    description: '客戶網址',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  url?: string;
}
