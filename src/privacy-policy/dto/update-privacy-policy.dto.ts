import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePrivacyPolicyDto {
  @ApiProperty({
    description: '中文內容',
    required: false,
  })
  @IsString()
  @IsOptional()
  zh_content?: string;

  @ApiProperty({
    description: '英文內容',
    required: false,
  })
  @IsString()
  @IsOptional()
  en_content?: string;
}
