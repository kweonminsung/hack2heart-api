import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { CommonService } from './common.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonResponseDto } from './dtos/common-response.dto';
import { CommonQueryDto } from './dtos/common-query.dto';
import { CommonLanguageResponseDto } from './dtos/common-language-reponse.dto';
import { CommonPackageResponseDto } from './dtos/common-package-reponse.dto';
import { CommonTmiResponseDto } from './dtos/common-tmi-response.dto';
import { CreateLanguageRequestDto } from './dtos/create-language-request.dto';
import { CreatePackageRequestDto } from './dtos/create-package-request.dto';
import { CreateTmiRequestDto } from './dtos/create-tmi-request.dto';
import { KafkaProducerService } from 'src/config/kafka-producer/kafka-producer.service';

@ApiTags('common')
@Controller()
export class CommonController {
  constructor(
    private readonly commonService: CommonService,
    private readonly kafkaProducerService: KafkaProducerService,
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Health Check' })
  healthCheck() {
    return new CommonResponseDto();
  }

  @Get('languages')
  @ApiOperation({ summary: '언어 리스트 조회' })
  async getLanguages(@Query() commonQueryDto: CommonQueryDto) {
    const { query } = commonQueryDto;

    const languages = await this.commonService.getLanguages(query);

    return new CommonResponseDto({
      languages: languages.map(
        (language) => new CommonLanguageResponseDto(language),
      ),
    });
  }

  @Post('languages')
  @HttpCode(201)
  @ApiOperation({ summary: '언어 생성' })
  async createLanguage(
    @Body() createLanguageRequestDto: CreateLanguageRequestDto,
  ) {
    const language = await this.commonService.createLanguage(
      createLanguageRequestDto,
    );

    return new CommonResponseDto(new CommonLanguageResponseDto(language));
  }

  @Get('packages')
  @ApiOperation({ summary: '패키지 리스트 조회' })
  async getPackages(@Query() commonQueryDto: CommonQueryDto) {
    const { query } = commonQueryDto;

    const packages = await this.commonService.getPackages(query);

    return new CommonResponseDto({
      packages: packages.map(
        (package_) => new CommonPackageResponseDto(package_),
      ),
    });
  }

  @Post('packages')
  @HttpCode(201)
  @ApiOperation({ summary: '패키지 생성' })
  async createPackage(
    @Body() createPackageRequestDto: CreatePackageRequestDto,
  ) {
    const package_ = await this.commonService.createPackage(
      createPackageRequestDto,
    );

    return new CommonResponseDto(new CommonPackageResponseDto(package_));
  }

  @Get('tmis')
  @ApiOperation({ summary: 'TMI 리스트 조회' })
  async getTmis(@Query() commonQueryDto: CommonQueryDto) {
    const { query } = commonQueryDto;

    const tmis = await this.commonService.getTmis(query);

    return new CommonResponseDto({
      tmis: tmis.map((tmi) => new CommonTmiResponseDto(tmi)),
    });
  }

  @Post('tmis')
  @HttpCode(201)
  @ApiOperation({ summary: 'TMI 생성' })
  async createTmi(@Body() createTmiRequestDto: CreateTmiRequestDto) {
    const tmi = await this.commonService.createTmi(createTmiRequestDto);

    return new CommonResponseDto(new CommonTmiResponseDto(tmi));
  }

  @Post('tests/kafka')
  @ApiOperation({ summary: 'Kafka 메시지 전송' })
  async emitTestKafkaMessage() {
    this.commonService.emitTestKafkaMessage();

    return new CommonResponseDto();
  }

  @Post('tests/grpc')
  @ApiOperation({ summary: 'GRPC 메시지 전송' })
  async sendTestGrpcMessage() {
    const response = await this.commonService.sendTestGrpcMessage();

    return new CommonResponseDto({ response });
  }

  @Post('tests/kafka/model-regenerate')
  @ApiOperation({ summary: '모델 재생성 요청' })
  async requestModelRegenerate() {
    this.kafkaProducerService.sendRegenerateModel();

    return new CommonResponseDto();
  }
}
