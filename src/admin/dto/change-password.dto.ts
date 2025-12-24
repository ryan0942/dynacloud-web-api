import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: '舊密碼',
    example: 'admin123456',
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    description: '新密碼',
    example: 'newPassword123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  newPassword: string;

  @ApiProperty({
    description: '確認新密碼',
    example: 'newPassword123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  confirmPassword: string;
}

export class ChangePasswordResponseDto {
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
    example: '更新管理員密碼成功',
  })
  message: string;
}
