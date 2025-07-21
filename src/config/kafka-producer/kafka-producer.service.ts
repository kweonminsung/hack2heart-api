import { Inject, Injectable } from '@nestjs/common';
import { KAFKA_PRODUCER_SERVICE } from './kafka-producer.constant';
import { ClientKafka } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { ReactionType } from '@prisma/client';

@Injectable()
export class KafkaProducerService {
  private topic: string;

  constructor(
    @Inject(KAFKA_PRODUCER_SERVICE) private readonly kafkaClient: ClientKafka,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    // 토픽 등록 (subscribeToResponseOf 호출해야 응답을 받을 수 있음)
    this.topic = this.configService.get('kafka.topic') || '';

    // Consumer 역할을 하는 경우에만 필요
    // this.kafkaClient.subscribeToResponseOf(
    //   this.configService.get('kafka.topic'),
    // );
    await this.kafkaClient.connect();
  }

  @Cron('0 0 * * * *')
  requestModelRegenerate() {
    console.log('Model regeneration requested');
  }

  sendMessage(message: any) {
    // 메시지 전송
    return this.kafkaClient.emit(this.topic, message);
  }

  sendUpdateUserReaction(
    from_user_id: number,
    to_user_id: number,
    type: ReactionType,
  ) {
    // 사용자 반응 업데이트 메시지 전송
    return this.kafkaClient.emit(this.topic, {
      job: 'update_user_reaction',
      from_user_id,
      to_user_id,
      rating: (() => {
        switch (type) {
          case ReactionType.SUPER_LIKE:
            return 3;
          case ReactionType.LIKE:
            return 2;
          case ReactionType.DISLIKE:
            return 0;
          default:
            return 0;
        }
      })(),
    });
  }

  sendRegenerateModel() {
    return this.kafkaClient.emit(this.topic, {
      job: 'regenerate_model',
    });
  }
}
