import { ApiProperty } from '@nestjs/swagger';

export class AdminInfoDto {
  @ApiProperty({
    description: '管理員 ID',
    example: '550ac8ff-eab0-4fc0-b106-d9fbfa908560',
  })
  id: string;

  @ApiProperty({
    description: '管理員姓名',
    example: '系統管理員',
  })
  name: string;

  @ApiProperty({
    description: '管理員帳號',
    example: 'admin',
  })
  account: string;

  @ApiProperty({
    description: '管理員頭像',
    example: 'https://example.com/avatar.jpg',
    nullable: true,
  })
  avatar: string | null;
}

export class AdminInfoResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => AdminInfoDto,
  })
  result: AdminInfoDto;

  @ApiProperty({
    description: '回傳訊息',
    example: '取得管理員資料成功',
  })
  message: string;
}

export class AdminUpdateResponseDto {
  @ApiProperty({
    description: '是否成功',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    example: null,
    nullable: true,
  })
  result: any;

  @ApiProperty({
    description: '回傳訊息',
    example: '更新管理員資料成功',
  })
  message: string;
}
