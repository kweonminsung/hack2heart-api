import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/config/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Language, Package, Tmi, User, UserTmi } from '@prisma/client';
import { CommonResponseDto } from 'src/common/dtos/common-response.dto';
import { CommonUserResponseDto } from 'src/common/dtos/common-user-response.dto';
import { CreateUserRequestDto } from './dtos/create-user-request.dto';
import { CommonService } from 'src/common/common.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '내 정보 조회' })
  async getUserMe(@CurrentUser() currentUser: User) {
    const userId = currentUser.id;
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return new CommonResponseDto(
      new CommonUserResponseDto(
        user,
        user.most_preferred_language as Language,
        user.most_preferred_package as Package,
        user.user_tmis.map((userTmi) => userTmi.tmi as Tmi),
      ),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: '유저 정보 조회' })
  async getUser(@Param('id', ParseIntPipe) userId: number) {
    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return new CommonResponseDto(
      new CommonUserResponseDto(
        user,
        user.most_preferred_language as Language,
        user.most_preferred_package as Package,
        user.user_tmis.map((userTmi) => userTmi.tmi as Tmi),
      ),
    );
  }

  @Post('me')
  @ApiOperation({ summary: '회원 가입' })
  async createMe(@Body() createUserRequestDto: CreateUserRequestDto) {
    const user = await this.userService.createUser(createUserRequestDto);

    if (!user) {
      throw new HttpException('User creation failed', 500);
    }

    return new CommonResponseDto(
      new CommonUserResponseDto(
        user,
        user.most_preferred_language as Language,
        user.most_preferred_package as Package,
        user.user_tmis.map((userTmi) => userTmi.tmi as Tmi),
      ),
    );
  }
}
