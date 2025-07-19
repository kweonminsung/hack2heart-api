import { HttpException, Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateUserRequestDto } from './dtos/create-user-request.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly commonService: CommonService,
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
}
