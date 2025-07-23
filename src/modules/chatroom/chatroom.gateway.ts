import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
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

  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @MessageBody() payload: { chatroom_id: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.info(`Client ${client.id} joining room: ${payload.chatroom_id}`);
    client.join(payload.chatroom_id);
  }

  @SubscribeMessage('leave_room')
  async handleLeaveRoom(
    @MessageBody() payload: { chatroom_id: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.info(`Client ${client.id} leaving room: ${payload.chatroom_id}`);
    client.leave(payload.chatroom_id);
  }
}
