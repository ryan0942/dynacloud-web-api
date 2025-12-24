import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    description: '姓名',
    example: '王小明',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '電子郵件',
    example: 'example@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: '電話號碼',
    example: '0912345678',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: '留言內容',
    example: '我想詢問關於貴公司的服務...',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
