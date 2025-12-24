import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, Min, ValidateNested } from 'class-validator';

export class BannerSortItemDto {
  @ApiProperty({
    description: 'Banner ID',
    example: 'uuid-1234-5678',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: '排序順序（從 1 開始）',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  sortOrder: number;
}

export class UpdateBannerSortDto {
  @ApiProperty({
    description: 'Banner 排序列表',
    type: [BannerSortItemDto],
    example: [
      { id: 'uuid-1', sortOrder: 1 },
      { id: 'uuid-2', sortOrder: 2 },
      { id: 'uuid-3', sortOrder: 3 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BannerSortItemDto)
  orders: BannerSortItemDto[];
}
