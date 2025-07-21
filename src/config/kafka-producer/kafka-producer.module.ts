import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_PRODUCER_SERVICE } from './kafka-producer.constant';
import { KafkaProducerService } from './kafka-producer.service';
import { ScheduleModule } from '@nestjs/schedule';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: KAFKA_PRODUCER_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get('kafka.client_id'),
              brokers: [configService.get('kafka.broker_url')],
            },
          },
        }),
      },
    ]),
    ScheduleModule.forRoot(),
  ],
  providers: [KafkaProducerService],
  exports: [KafkaProducerService],
})
export class KafkaProducerModule {}
