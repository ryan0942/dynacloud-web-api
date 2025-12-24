import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({
    description: '管理員姓名'})
  @IsString()
  name: string;

  @ApiProperty({
    description: '管理員帳號'})
  @IsString()
  account: string;

  @ApiProperty({
    description: '管理員頭像',
    required: false,
    nullable: true
  })
  @IsString()
  @IsOptional()
  avatar?: string | null;
}
