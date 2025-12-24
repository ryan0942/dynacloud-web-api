import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, Min, ValidateNested } from 'class-validator';

export class CustomerSortItemDto {
  @ApiProperty({
    description: '客戶 ID',
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

export class UpdateCustomerSortDto {
  @ApiProperty({
    description: '客戶排序列表',
    type: [CustomerSortItemDto],
    example: [
      { id: 'uuid-1', sortOrder: 1 },
      { id: 'uuid-2', sortOrder: 2 },
      { id: 'uuid-3', sortOrder: 3 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomerSortItemDto)
  orders: CustomerSortItemDto[];
}
