import { Chatroom } from '@prisma/client';

export class CommonChatroomResponseDto {
  id: string;
  creatcd_at: Date;

  constructor(chatroom: Chatroom) {
    this.id = chatroom.id;
    this.creatcd_at = chatroom.created_at;
  }
}
