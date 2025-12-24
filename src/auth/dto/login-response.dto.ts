import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token',
  })
  access_token: string;
}

export class LoginSuccessResponseDto {
  @ApiProperty({
    description: '是否成功',
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => LoginResponseDto,
  })
  result: LoginResponseDto;

  @ApiProperty({
    description: '回傳訊息',
  })
  message: string;
}
