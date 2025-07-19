export class CommonMessageResponseDto {
  chatroom_id: string;
  user_id: number;
  content: string;
  created_at: Date;

  constructor(
    chatroomId: string,
    userId: number,
    content: string,
    createdAt: Date,
  ) {
    this.chatroom_id = chatroomId;
    this.user_id = userId;
    this.content = content;
    this.created_at = createdAt;
  }
}
