import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatroomService } from './chatroom.service';
import { CommonService } from 'src/common/common.service';
import { CommonResponseDto } from 'src/common/dtos/common-response.dto';
import { JwtAuthGuard } from 'src/config/auth/jwt/jwt.guard';
import { CreateMessageRequestDto } from './dtos/create-message-request.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { CommonMessageResponseDto } from 'src/common/dtos/common-message-response.dto';

@ApiTags('chatrooms')
@Controller('chatrooms')
export class ChatroomController {
  constructor(
    private readonly chatroomService: ChatroomService,
    private readonly commonService: CommonService,
  ) {}

  @Get(':chatroom_id/users')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '채팅방 유저 리스트 조회',
  })
  @ApiBearerAuth('access-token')
  async getChatroomUsers(
    @CurrentUser() currentUser: User,
    @Param('chatroom_id') chatroomId: string,
  ) {
    const chatroom = await this.commonService.getChatroomById(chatroomId);
    if (!chatroom) {
      throw new HttpException('Chatroom not found', 404);
    }

    const isValidUser = await this.chatroomService.validateChatroomUser(
      chatroomId,
      currentUser.id,
    );
    if (!isValidUser) {
      throw new HttpException('User not authorized for this chatroom', 403);
    }

    const users = await this.chatroomService.getChatroomUsers(chatroomId);

    return new CommonResponseDto({
      users,
    });
  }

  @Post(':chatroom_id/messages')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '채팅방 메시지 전송',
  })
  @ApiBearerAuth('access-token')
  async createMessage(
    @CurrentUser() currentUser: User,
    @Param('chatroom_id') chatroomId: string,
    @Body() createMessageDto: CreateMessageRequestDto,
  ) {
    const chatroom = await this.commonService.getChatroomById(chatroomId);
    if (!chatroom) {
      throw new HttpException('Chatroom not found', 404);
    }

    const isValidUser = await this.chatroomService.validateChatroomUser(
      chatroomId,
      currentUser.id,
    );
    if (!isValidUser) {
      throw new HttpException('User not authorized for this chatroom', 403);
    }

    const message = await this.chatroomService.createMessage(
      chatroomId,
      currentUser.id,
      createMessageDto,
    );

    return new CommonResponseDto(
      new CommonMessageResponseDto(
        chatroomId,
        currentUser.id,
        message.content,
        message.created_at,
      ),
    );
  }
}
