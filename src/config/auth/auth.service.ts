import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async validateGithubToken(accessToken: string): Promise<any> {
    const response = await this.httpService.axiosRef.get(
      'https://api.github.com/user',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  }

  async loginWithGithub(accessToken: string) {
    const githubUser = await this.validateGithubToken(accessToken);
    if (!githubUser) {
      throw new HttpException('Invalid GitHub token', 401);
    }

    let user = await this.prismaService.user.findUnique({
      where: { github_oauth_id: githubUser.id },
    });

    if (!user) {
      return null;
    }
    return this.jwtService.sign({
      sid: user.id,
      gid: user.github_oauth_id,
    } as Payload);
  }

  async testLogin() {
    const testUser = {
      id: 1,
      github_oauth_id: 'gh_001',
    };

    return this.jwtService.sign({
      sid: testUser.id,
      gid: testUser.github_oauth_id,
    } as Payload);
  }
}
