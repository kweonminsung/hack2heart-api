import { Module } from '@nestjs/common';
import { ChatroomController } from './chatroom.controller';
import { ChatroomService } from './chatroom.service';
import { ChatroomGateway } from './chatroom.gateway';

@Module({
  controllers: [ChatroomController],
  providers: [ChatroomService, ChatroomGateway],
})
export class ChatroomModule {}
