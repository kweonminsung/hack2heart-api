import { HttpException, Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateUserRequestDto } from './dtos/create-user-request.dto';
import { UpdateUserRequestDto } from './dtos/update-user-request.dto copy';
import { CreateUserCodeRequestDto } from './dtos/create-user-code-request.dto';
import { UpdateUserCodeRequestDto } from './dtos/update-user-code-request.dto';
import { ModelClientService } from 'src/config/model-client/model-client.service';
import { CreateUserReactionRequestDto } from './dtos/create-user-reaction.request.dto';
import { KafkaProducerService } from 'src/config/kafka-producer/kafka-producer.service';
import { v4 } from 'uuid';
import { ReactionType } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService,
    private readonly modelClientService: ModelClientService,
    private readonly kafkaProducerService: KafkaProducerService,
  ) {}

  async createUser(createUserRequestDto: CreateUserRequestDto) {
    const { most_preferred_language_id, most_preferred_package_id } =
      createUserRequestDto;

    if (most_preferred_language_id) {
      const language = await this.commonService.getLanguageById(
        most_preferred_language_id,
      );
      if (!language) {
        throw new HttpException('Language not found', 400);
      }
    }
    if (most_preferred_package_id) {
      const package_ = await this.commonService.getPackageById(
        most_preferred_package_id,
      );
      if (!package_) {
        throw new HttpException('Package not found', 400);
      }
    }

    const user = await this.prismaService.$transaction(async (tx) => {
      const txUser = await tx.user.create({
        data: {
          github_oauth_id: createUserRequestDto.github_oauth_id,
          name: createUserRequestDto.name,
          gender: createUserRequestDto.gender,
          birth_date: createUserRequestDto.birth_date,
          most_preferred_language_id: most_preferred_language_id,
          most_preferred_package_id: most_preferred_package_id,
          looking_for_love: createUserRequestDto.looking_for_love,
          looking_for_friend: createUserRequestDto.looking_for_friend,
          looking_for_coworker: createUserRequestDto.looking_for_coworker,
        },
      });

      await tx.userTmi.createMany({
        data: createUserRequestDto.tmi_ids.map((tmi_id) => ({
          user_id: txUser.id,
          tmi_id,
        })),
      });

      return txUser;
    });

    return await this.commonService.getUserById(user.id);
  }

  async updateUser(userId: number, updateUserRequestDto: UpdateUserRequestDto) {
    const { most_preferred_language_id, most_preferred_package_id } =
      updateUserRequestDto;

    if (most_preferred_language_id) {
      const language = await this.commonService.getLanguageById(
        most_preferred_language_id,
      );
      if (!language) {
        throw new HttpException('Language not found', 400);
      }
    }
    if (most_preferred_package_id) {
      const package_ = await this.commonService.getPackageById(
        most_preferred_package_id,
      );
      if (!package_) {
        throw new HttpException('Package not found', 400);
      }
    }

    await this.prismaService.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id: userId },
        data: {
          name: updateUserRequestDto.name,
          gender: updateUserRequestDto.gender,
          birth_date: updateUserRequestDto.birth_date,
          avatar_id: updateUserRequestDto.avatar_id,
          most_preferred_language_id: most_preferred_language_id,
          most_preferred_package_id: most_preferred_package_id,
          looking_for_love: updateUserRequestDto.looking_for_love,
          looking_for_friend: updateUserRequestDto.looking_for_friend,
          looking_for_coworker: updateUserRequestDto.looking_for_coworker,
        },
      });

      await tx.userTmi.deleteMany({
        where: { user_id: userId },
      });
      await tx.userTmi.createMany({
        data: updateUserRequestDto.tmi_ids.map((tmi_id) => ({
          user_id: user.id,
          tmi_id,
        })),
      });
    });

    return await this.commonService.getUserById(userId);
  }

  async deleteUser(userId: number) {
    await this.prismaService.user.delete({
      where: { id: userId },
    });
  }

  async getUserCodes(userId: number, pinned?: boolean) {
    const userCodes = await this.prismaService.userCode.findMany({
      where: {
        user_id: userId,
        ...(pinned !== undefined && {
          index: pinned ? { not: null } : null,
        }),
      },
      orderBy: {
        index: 'asc',
      },
    });

    return userCodes;
  }

  async createUserCode(
    userId: number,
    createUserCodeRequestDto: CreateUserCodeRequestDto,
  ) {
    const { content } = createUserCodeRequestDto;

    const userCode = await this.prismaService.userCode.create({
      data: {
        user_id: userId,
        content,
      },
    });

    return userCode;
  }

  async updateUserCodeIndices(
    userId: number,
    ids: number[],
    indices: number[],
  ) {
    await this.prismaService.$transaction(async (tx) => {
      await tx.userCode.updateMany({
        where: { user_id: userId },
        data: { index: null },
      });

      const userCodes = await tx.userCode.findMany({
        where: { user_id: userId },
      });

      for (let i = 0; i < ids.length; i++) {
        const codeId = ids[i];
        const index = indices[i];

        const userCode = userCodes.find((code) => code.id === codeId);
        if (!userCode) {
          throw new HttpException(`Code with ID ${codeId} not found`, 404);
        }

        await tx.userCode.update({
          where: { id: codeId },
          data: { index },
        });
      }
    });
  }

  async updateUserCode(
    userId: number,
    codeId: number,
    updateUserCodeRequestDto: UpdateUserCodeRequestDto,
  ) {
    const { content } = updateUserCodeRequestDto;

    const userCode = await this.prismaService.userCode.update({
      where: {
        id: codeId,
        user_id: userId,
      },
      data: {
        content,
      },
    });

    return userCode;
  }

  async deleteUserCode(userId: number, codeId: number) {
    await this.prismaService.userCode.delete({
      where: {
        id: codeId,
        user_id: userId,
      },
    });
  }

  async getUserChatrooms(userId: number) {
    const chatrooms = await this.prismaService.chatroom.findMany({
      where: {
        chatroom_users: {
          some: {
            user_id: userId,
          },
        },
      },
      include: {
        chatroom_users: {
          include: {
            user: true,
          },
        },
        chatroom_messages: {
          orderBy: { created_at: 'desc' },
          take: 1,
        },
      },
    });

    return chatrooms;
  }

  async getUserRecommendations(userId: number) {
    try {
      const recommendedUserIds =
        await this.modelClientService.getUserRecommendations(userId);

      const users = await this.prismaService.user.findMany({
        where: {
          id: { in: recommendedUserIds },
        },
        include: {
          user_reaction_tos: true,
          most_preferred_language: true,
          most_preferred_package: true,
          user_tmis: {
            include: {
              tmi: true,
            },
          },
        },
      });

      return users;
    } catch (err) {
      console.error('Error fetching user recommendations:', err);
      throw new HttpException('Failed to fetch user recommendations', 500);
    }
  }

  async getUserReaction(from_user_id: number, to_user_id: number) {
    const reaction = await this.prismaService.userReaction.findFirst({
      where: {
        from_user_id,
        to_user_id,
      },
    });

    return reaction;
  }

  async findChatroomWithBothUsers(userId: number, from_user_id: number) {
    const chatroom = await this.prismaService.chatroom.findFirst({
      where: {
        chatroom_users: {
          some: {
            user_id: userId,
          },
        },
        AND: [
          {
            chatroom_users: {
              some: {
                user_id: from_user_id,
              },
            },
          },
        ],
      },
      include: {
        chatroom_users: true,
      },
    });

    return chatroom;
  }

  async createUserReaction(
    userId: number,
    createUserReactionRequestDto: CreateUserReactionRequestDto,
  ) {
    const { to_user_id, reaction_type } = createUserReactionRequestDto;

    const reaction = await this.prismaService.$transaction(async (tx) => {
      let existingReaction = await this.getUserReaction(userId, to_user_id);

      if (existingReaction) {
        existingReaction = await tx.userReaction.update({
          where: {
            id: existingReaction.id,
          },
          data: {
            type: reaction_type,
          },
        });
      } else {
        existingReaction = await tx.userReaction.create({
          data: {
            from_user_id: userId,
            to_user_id,
            type: reaction_type,
          },
        });
      }

      const reverseReaction = await this.getUserReaction(to_user_id, userId);
      const existingChatroom = await this.findChatroomWithBothUsers(
        userId,
        to_user_id,
      );

      if (
        !existingChatroom &&
        reverseReaction &&
        (reaction_type === ReactionType.SUPER_LIKE ||
          reaction_type === ReactionType.LIKE) &&
        (reverseReaction.type === ReactionType.SUPER_LIKE ||
          reverseReaction.type === ReactionType.LIKE)
      ) {
        const chatroom = await tx.chatroom.create({
          data: {
            id: v4(),
          },
        });

        await tx.chatroomUser.createMany({
          data: [
            { user_id: userId, chatroom_id: chatroom.id },
            { user_id: to_user_id, chatroom_id: chatroom.id },
          ],
        });
      }

      return existingReaction;
    });

    // Send reaction to Kafka for processing
    try {
      this.kafkaProducerService.sendUpdateUserReaction(
        userId,
        to_user_id,
        reaction_type,
      );
    } catch (err) {
      console.error('Failed to send reaction to Kafka:', err);
    }

    return reaction;
  }
}
