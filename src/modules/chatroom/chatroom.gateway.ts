import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommonMessageResponseDto } from 'src/common/dtos/common-message-response.dto';

@WebSocketGateway({
  cors: true,
  namespace: 'ws/chatrooms',
})
export class ChatroomGateway {
  @WebSocketServer()
  server: Server;

  sendMessage(
    chatroomId: string,
    userId: number,
    content: string,
    createdAt: Date,
  ) {
    this.server
      .to(chatroomId)
      .emit(
        'sent_message',
        new CommonMessageResponseDto(chatroomId, userId, content, createdAt),
      );
  }
}
