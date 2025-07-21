import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GithubOAuthRequestDto } from './dtos/github-oauth-request.dto';
import { AuthService } from './auth.service';
import { CommonResponseDto } from 'src/common/dtos/common-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('github')
  @HttpCode(201)
  @ApiOperation({ summary: 'Github 토큰으로 로그인' })
  async loginWithGithubOAuth(
    @Body() githubOAuthRequestDto: GithubOAuthRequestDto,
  ) {
    const access_token = await this.authService.loginWithGithub(
      githubOAuthRequestDto.access_token,
    );

    if (!access_token) {
      throw new HttpException('User not found', 404);
    }

    return new CommonResponseDto({
      access_token,
    });
  }

  @Post('test')
  @HttpCode(201)
  @ApiOperation({ summary: '테스트용 로그인' })
  async testLogin() {
    return new CommonResponseDto({
      access_token: await this.authService.testLogin(),
    });
  }
}
