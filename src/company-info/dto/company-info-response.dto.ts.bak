import { ApiProperty } from '@nestjs/swagger';

export class CompanyInfoDto {
  @ApiProperty({
    description: '公司資訊 ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  id: string;

  @ApiProperty({
    description: '中文地址',
    example: '台北市信義區信義路五段7號',
  })
  zh_address: string;

  @ApiProperty({
    description: '英文地址',
    example: 'No. 7, Section 5, Xinyi Road, Xinyi District, Taipei City',
  })
  en_address: string;

  @ApiProperty({
    description: '聯絡電話',
    example: '+886-2-8101-8101',
  })
  phone: string;

  @ApiProperty({
    description: '電子郵件',
    example: 'contact@uidea.com.tw',
  })
  email: string;

  @ApiProperty({
    description: '中文營業時間',
    example: '週一至週五 09:00-18:00',
  })
  zh_opening_time: string;

  @ApiProperty({
    description: '英文營業時間',
    example: 'Monday to Friday 09:00-18:00',
  })
  en_opening_time: string;

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

export class CompanyInfoLocalizedDto {
  @ApiProperty({
    description: '公司資訊 ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  id: string;

  @ApiProperty({
    description: '地址（根據語系顯示）',
    example: 'No. 7, Section 5, Xinyi Road, Xinyi District, Taipei City',
  })
  address: string;

  @ApiProperty({
    description: '聯絡電話',
    example: '+886-2-8101-8101',
  })
  phone: string;

  @ApiProperty({
    description: '電子郵件',
    example: 'contact@uidea.com.tw',
  })
  email: string;

  @ApiProperty({
    description: '營業時間（根據語系顯示）',
    example: 'Monday to Friday 09:00-18:00',
  })
  opening_time: string;
}

export class CompanyInfoResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => CompanyInfoDto,
  })
  result: CompanyInfoDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '公司資訊更新成功',
  })
  message: string;
}

export class CompanyInfoLocalizedResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料（語系轉換後）',
    type: () => CompanyInfoLocalizedDto,
  })
  result: CompanyInfoLocalizedDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '獲取公司資訊成功',
  })
  message: string;
}
