import { Chatroom, GenderType, User } from '@prisma/client';
import { CommonSimpleUserResponseDto } from './common-user-response.dto';

export class CommonChatroomResponseDto {
  id: string;
  name: string;
  gender: GenderType;
  birth_date: Date;
  avatar_id: number | null;
  created_at: Date;
  last_message: string | null;

  constructor(chatroom: Chatroom, toUser: User, lastMessage: string | null) {
    this.id = chatroom.id;
    this.name = toUser.name;
    this.gender = toUser.gender;
    this.birth_date = toUser.birth_date;
    this.avatar_id = toUser.avatar_id;
    this.created_at = chatroom.created_at;
    this.last_message = lastMessage;
  }
}
