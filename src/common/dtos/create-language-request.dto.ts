import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLanguageRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
