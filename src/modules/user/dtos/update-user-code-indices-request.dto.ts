import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateUserCodeIndicesRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsArray()
  ids: number[];

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsArray()
  indices: number[];
}
