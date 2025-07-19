import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class GetUserCodesQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  pinned?: boolean;
}
