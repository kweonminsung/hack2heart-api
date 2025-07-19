import { Inject, Injectable } from '@nestjs/common';
import { KAFKA_PRODUCER_SERVICE } from './kafka-producer.constant';
import { ClientKafka } from '@nestjs/microservices';

const KAFKA_TOPIC = 'love2heart';

@Injectable()
export class KafkaProducerService {
  constructor(
    @Inject(KAFKA_PRODUCER_SERVICE) private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // 토픽 등록 (subscribeToResponseOf 호출해야 응답을 받을 수 있음)
    this.kafkaClient.subscribeToResponseOf(KAFKA_TOPIC);
    await this.kafkaClient.connect();
  }

  sendMessage(message: any) {
    // 메시지 전송
    return this.kafkaClient.emit(KAFKA_TOPIC, message);
  }
}
