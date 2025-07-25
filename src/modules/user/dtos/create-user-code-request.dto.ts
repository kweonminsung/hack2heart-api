import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserCodeRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}
