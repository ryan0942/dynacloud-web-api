import { ApiProperty } from '@nestjs/swagger';

export class PrivacyPolicyDto {
  @ApiProperty({
    description: '隱私權政策 ID',
    example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  })
  id: string;

  @ApiProperty({
    description: '中文內容',
    example: '本隱私權政策說明我們如何收集、使用及保護您的個人資料...',
    nullable: true,
  })
  zh_content: string | null;

  @ApiProperty({
    description: '英文內容',
    example: 'This Privacy Policy explains how we collect, use and protect your personal information...',
    nullable: true,
  })
  en_content: string | null;

  @ApiProperty({
    description: '建立時間',
    example: '2025-01-15T10:30:00.000Z',
    nullable: true,
  })
  createdAt: Date | null;

  @ApiProperty({
    description: '更新時間',
    example: '2025-01-15T15:45:00.000Z',
    nullable: true,
  })
  updatedAt: Date | null;
}

export class PrivacyPolicyLocalizedDto {
  @ApiProperty({
    description: '隱私權政策 ID',
    example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  })
  id: string;

  @ApiProperty({
    description: '內容（根據語系顯示）',
    example: 'This Privacy Policy explains how we collect, use and protect your personal information...',
    nullable: true,
  })
  content: string | null;
}

export class PrivacyPolicyResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => PrivacyPolicyDto,
  })
  result: PrivacyPolicyDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '隱私權政策更新成功',
  })
  message: string;
}

export class PrivacyPolicyLocalizedResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => PrivacyPolicyLocalizedDto,
  })
  result: PrivacyPolicyLocalizedDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取隱私權政策成功',
  })
  message: string;
}
