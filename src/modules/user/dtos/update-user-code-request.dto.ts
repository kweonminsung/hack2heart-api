import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserCodeRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}
