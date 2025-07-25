import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}
