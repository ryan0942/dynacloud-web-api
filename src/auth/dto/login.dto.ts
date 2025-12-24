import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: '管理員帳號',
    example: 'admin',
  })
  account: string;

  @ApiProperty({
    description: '管理員密碼',
    example: 'admin123456',
  })
  password: string;
}
