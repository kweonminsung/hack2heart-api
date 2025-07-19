import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CommonQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  query?: string;
}
