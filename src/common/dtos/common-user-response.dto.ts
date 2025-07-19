import { GenderType, Language, Package, Tmi, User } from '@prisma/client';
import { CommonTmiResponseDto } from './common-tmi-response.dto';

export class CommonUserResponseDto {
  id: number;
  name: string;
  gender: GenderType;
  birth_date: Date;
  avatar_id: number | null;
  most_preferred_language: string;
  most_preferred_package: string;
  looking_for_love: boolean;
  looking_for_friend: boolean;
  looking_for_coworker: boolean;
  tmis: CommonTmiResponseDto[];
  created_at: Date;

  constructor(user: User, language: Language, package_: Package, tmis: Tmi[]) {
    this.id = user.id;
    this.name = user.name;
    this.gender = user.gender;
    this.birth_date = user.birth_date;
    this.avatar_id = user.avatar_id;
    this.most_preferred_language = language.name;
    this.most_preferred_package = package_.name;
    this.looking_for_love = user.looking_for_love;
    this.looking_for_friend = user.looking_for_friend;
    this.looking_for_coworker = user.looking_for_coworker;
    this.tmis = tmis.map((tmi) => new CommonTmiResponseDto(tmi));
    this.created_at = user.created_at;
  }
}
