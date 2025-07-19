import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTmiRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
