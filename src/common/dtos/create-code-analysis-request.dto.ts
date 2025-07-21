import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCodeAnalysisRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}
