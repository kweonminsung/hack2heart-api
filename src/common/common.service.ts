import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateLanguageRequestDto } from './dtos/create-language-request.dto';
import { CreatePackageRequestDto } from './dtos/create-package-request.dto';
import { CreateTmiRequestDto } from './dtos/create-tmi-request.dto';

@Injectable()
export class CommonService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserById(userId: number) {
    return this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        most_preferred_language: true,
        most_preferred_package: true,
        user_tmis: {
          include: {
            tmi: true,
          },
        },
      },
    });
  }

  async getLanguageById(languageId: number) {
    return this.prismaService.language.findUnique({
      where: { id: languageId },
    });
  }

  async getPackageById(packageId: number) {
    return this.prismaService.package.findUnique({
      where: { id: packageId },
    });
  }

  async getTmiById(tmiId: number) {
    return this.prismaService.tmi.findUnique({
      where: { id: tmiId },
    });
  }

  async getLanguages(query?: string) {
    return this.prismaService.language.findMany({
      where: {
        name: query ? { contains: query } : undefined,
      },
      orderBy: { name: 'asc' },
    });
  }

  async createLanguage(createLanguageRequestDto: CreateLanguageRequestDto) {
    const { name } = createLanguageRequestDto;

    const existingLanguage = await this.prismaService.language.findFirst({
      where: { name },
    });
    if (existingLanguage) {
      throw new HttpException('Language already exists', 400);
    }

    return this.prismaService.language.create({
      data: {
        name,
      },
    });
  }

  async getPackages(query?: string) {
    return this.prismaService.package.findMany({
      where: {
        name: query ? { contains: query } : undefined,
      },
      orderBy: { name: 'asc' },
    });
  }

  async createPackage(createPackageRequestDto: CreatePackageRequestDto) {
    const { name } = createPackageRequestDto;

    const existingPackage = await this.prismaService.package.findFirst({
      where: { name },
    });
    if (existingPackage) {
      throw new HttpException('Package already exists', 400);
    }

    return this.prismaService.package.create({
      data: {
        name,
      },
    });
  }

  async getTmis(query?: string) {
    return this.prismaService.tmi.findMany({
      where: {
        name: query ? { contains: query } : undefined,
      },
      orderBy: { name: 'asc' },
    });
  }

  async createTmi(createTmiRequestDto: CreateTmiRequestDto) {
    const { name } = createTmiRequestDto;

    const existingTmi = await this.prismaService.tmi.findFirst({
      where: { name },
    });
    if (existingTmi) {
      throw new HttpException('TMI already exists', 400);
    }

    return this.prismaService.tmi.create({
      data: {
        name,
      },
    });
  }
}
