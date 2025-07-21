import { ApiProperty } from '@nestjs/swagger';
import { ReactionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserReactionRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  to_user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(ReactionType)
  reaction_type: ReactionType;
}
