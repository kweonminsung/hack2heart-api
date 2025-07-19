import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
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
import { UpdateUserRequestDto } from './dtos/update-user-request.dto copy';
import { GetUserCodeQueryDto } from './dtos/get-user-code-query.dto';
import { GetUserCodeResponseDto } from './dtos/get-user-code-response.dto';
import { CreateUserCodeRequestDto } from './dtos/create-user-code-request.dto';
import { UpdateUserCodeRequestDto } from './dtos/update-user-code-request.dto';
import { CommonService } from 'src/common/common.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly commonService: CommonService,
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '내 정보 조회' })
  async getUserMe(@CurrentUser() currentUser: User) {
    const user = await this.userService.getUserById(currentUser.id);
    if (!user) {
      throw new HttpException('User fetch failed', 500);
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

  @Post()
  @HttpCode(201)
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

  @Put('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '내 정보 수정' })
  async updateMe(
    @CurrentUser() currentUser: User,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ) {
    const user = await this.userService.updateUser(
      currentUser.id,
      updateUserRequestDto,
    );
    if (!user) {
      throw new HttpException('User update failed', 500);
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

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  async deleteMe(@CurrentUser() currentUser: User) {
    await this.userService.deleteUser(currentUser.id);

    return new CommonResponseDto();
  }

  @Get('me/codes')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '내 코드 리스트 조회' })
  async getUserMeCodes(
    @CurrentUser() currentUser: User,
    @Query() getUserCodeQueryDto: GetUserCodeQueryDto,
  ) {
    const { pinned } = getUserCodeQueryDto;

    const userCodes = await this.userService.getUserCodes(
      currentUser.id,
      pinned,
    );

    return new CommonResponseDto({
      userCodes: userCodes.map(
        (userCode) => new GetUserCodeResponseDto(userCode),
      ),
    });
  }

  @Get(':id/codes')
  @ApiOperation({ summary: '유저 코드 리스트 조회' })
  async getUserCodes(
    @Param('id', ParseIntPipe) userId: number,
    @Query() getUserCodeQueryDto: GetUserCodeQueryDto,
  ) {
    const { pinned } = getUserCodeQueryDto;

    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const userCodes = await this.userService.getUserCodes(userId, pinned);

    return new CommonResponseDto({
      userCodes: userCodes.map(
        (userCode) => new GetUserCodeResponseDto(userCode),
      ),
    });
  }

  @Post('me/codes')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '내 코드 업로드' })
  async createUserCode(
    @CurrentUser() currentUser: User,
    @Body() createUserCodeRequestDto: CreateUserCodeRequestDto,
  ) {
    const userCode = await this.userService.createUserCode(
      currentUser.id,
      createUserCodeRequestDto,
    );

    return new CommonResponseDto(new GetUserCodeResponseDto(userCode));
  }

  @Put('me/codes/:code_id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '내 코드 수정' })
  async updateUserCode(
    @CurrentUser() currentUser: User,
    @Param('code_id', ParseIntPipe) codeId: number,
    @Body() updateUserCodeRequestDto: UpdateUserCodeRequestDto,
  ) {
    const userCode = await this.userService.updateUserCode(
      currentUser.id,
      codeId,
      updateUserCodeRequestDto,
    );

    return new CommonResponseDto(new GetUserCodeResponseDto(userCode));
  }

  @Delete('me/codes/:code_id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '내 코드 삭제' })
  async deleteUserCode(
    @CurrentUser() currentUser: User,
    @Param('code_id', ParseIntPipe) codeId: number,
  ) {
    const userCode = await this.commonService.getUserCodeById(
      currentUser.id,
      codeId,
    );
    if (!userCode) {
      throw new HttpException('User code not found', 404);
    }

    await this.userService.deleteUserCode(currentUser.id, codeId);

    return new CommonResponseDto();
  }
}
