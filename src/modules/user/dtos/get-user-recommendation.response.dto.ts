import { Language, Package, ReactionType, Tmi, User } from '@prisma/client';
import { CommonUserResponseDto } from 'src/common/dtos/common-user-response.dto';

export class GetUserRecommendationResponseDto extends CommonUserResponseDto {
  previous_reaction_type: ReactionType | null;

  constructor(
    user: User,
    language: Language,
    package_: Package,
    tmis: Tmi[],
    previous_reaction_type: ReactionType | null,
  ) {
    super(user, language as Language, package_ as Package, tmis);
    this.previous_reaction_type = previous_reaction_type;
  }
}
