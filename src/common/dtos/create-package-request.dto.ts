import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePackageRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
