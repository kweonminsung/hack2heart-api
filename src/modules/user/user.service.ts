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

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService,
    private readonly modelClientService: ModelClientService,
    private readonly kafkaProducerService: KafkaProducerService,
  ) {}

  async getUserById(userId: number) {
    return await this.commonService.getUserById(userId);
  }

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

  async updateUserCode(
    userId: number,
    codeId: number,
    updateUserCodeRequestDto: UpdateUserCodeRequestDto,
  ) {
    const { content, pinned } = updateUserCodeRequestDto;

    const userCode = await this.prismaService.userCode.update({
      where: {
        id: codeId,
        user_id: userId,
      },
      data: {
        content,
        ...(pinned !== undefined && { index: pinned ? 0 : null }),
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

  async createUserReaction(
    userId: number,
    createUserReactionRequestDto: CreateUserReactionRequestDto,
  ) {
    const { to_user_id, reaction_type } = createUserReactionRequestDto;

    const reaction = await this.prismaService.userReaction.create({
      data: {
        from_user_id: userId,
        to_user_id,
        type: reaction_type,
      },
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
