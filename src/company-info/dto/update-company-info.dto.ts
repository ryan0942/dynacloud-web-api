import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateCompanyInfoDto {
  @ApiProperty({
    description: '中文地址',
    required: false,
  })
  @IsString()
  @IsOptional()
  zh_address?: string;

  @ApiProperty({
    description: '英文地址',
    required: false,
  })
  @IsString()
  @IsOptional()
  en_address?: string;

  @ApiProperty({
    description: '中文聯絡電話',
    required: false,
  })
  @IsString()
  @IsOptional()
  zh_phone?: string;

  @ApiProperty({
    description: '英文聯絡電話',
    required: false,
  })
  @IsString()
  @IsOptional()
  en_phone?: string;

  @ApiProperty({
    description: '中文電子郵件',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  zh_email?: string;

  @ApiProperty({
    description: '英文電子郵件',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  en_email?: string;

  @ApiProperty({
    description: '中文營業時間',
    required: false,
  })
  @IsString()
  @IsOptional()
  zh_opening_time?: string;

  @ApiProperty({
    description: '英文營業時間',
    required: false,
  })
  @IsString()
  @IsOptional()
  en_opening_time?: string;
}
