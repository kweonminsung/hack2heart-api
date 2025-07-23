import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { ChatroomGateway } from './chatroom.gateway';
import { CreateMessageRequestDto } from './dtos/create-message-request.dto';

@Injectable()
export class ChatroomService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly chatroomGateway: ChatroomGateway,
  ) {}

  async validateChatroomUser(chatroomId: string, userId: number) {
    const chatroomUser = await this.prismaService.chatroomUser.findFirst({
      where: {
        chatroom_id: chatroomId,
        user_id: userId,
      },
    });

    if (!chatroomUser) {
      return false;
    }
    return true;
  }

  async getChatroomUsers(chatroomId: string) {
    const chatroomUsers = await this.prismaService.chatroomUser.findMany({
      where: { chatroom_id: chatroomId },
      include: {
        user: {
          include: {
            most_preferred_language: true,
            most_preferred_package: true,
            user_tmis: {
              include: {
                tmi: true,
              },
            },
          },
        },
      },
    });

    return chatroomUsers.map((chatroomUser) => chatroomUser.user);
  }

  async createMessage(
    chatroomId: string,
    userId: number,
    createMessageRequestDto: CreateMessageRequestDto,
  ) {
    const { content } = createMessageRequestDto;

    const message = await this.prismaService.chatroomMessage.create({
      data: {
        chatroom_id: chatroomId,
        user_id: userId,
        content,
      },
    });

    // Emit the new message to the chatroom
    this.chatroomGateway.sendMessage(
      chatroomId,
      userId,
      content,
      message.created_at,
    );

    return message;
  }

  async getMessages(
    chatroomId: string,
    beforeMessageId?: number,
    limit?: number,
  ) {
    return await this.prismaService.chatroomMessage.findMany({
      where: { chatroom_id: chatroomId },
      orderBy: { created_at: 'asc' },
      take: limit || 20,
      ...(beforeMessageId && {
        cursor: { id: beforeMessageId },
        skip: 1, // Skip the cursor message
      }),
    });
  }
}
