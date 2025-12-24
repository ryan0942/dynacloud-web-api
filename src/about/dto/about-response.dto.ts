import { ApiProperty } from '@nestjs/swagger';

export class AboutDto {
  @ApiProperty({
    description: '關於我們 ID',
    example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  })
  id: string;

  @ApiProperty({
    description: '中文內容',
    example: '很有想法科技有限公司成立於2024年，專注於提供企業數位轉型解決方案...',
    nullable: true,
  })
  zh_content: string | null;

  @ApiProperty({
    description: '英文內容',
    example: 'UIdea Technology was founded in 2024, focusing on providing digital transformation solutions for enterprises...',
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

export class AboutLocalizedDto {
  @ApiProperty({
    description: '關於我們 ID',
    example: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
  })
  id: string;

  @ApiProperty({
    description: '內容（根據語系顯示）',
    example: 'UIdea Technology was founded in 2024, focusing on providing digital transformation solutions for enterprises...',
    nullable: true,
  })
  content: string | null;
}

export class AboutResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => AboutDto,
  })
  result: AboutDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '關於我們更新成功',
  })
  message: string;
}

export class AboutLocalizedResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => AboutLocalizedDto,
  })
  result: AboutLocalizedDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取關於我們成功',
  })
  message: string;
}
