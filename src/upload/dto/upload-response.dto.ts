import { ApiProperty } from '@nestjs/swagger';

export class UploadResultDto {
  @ApiProperty({
    description: '檔案 URL',
  })
  url: string;
}

export class UploadResponseDto {
  @ApiProperty({
    description: '是否成功',
  })
  success: boolean;

  @ApiProperty({
    description: '回傳資料',
    type: () => UploadResultDto,
  })
  result: UploadResultDto;

  @ApiProperty({
    description: '回傳訊息',
  })
  message: string;
}
