import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import configuration from './configuration';
import { AuthModule } from '../auth/auth.module';
import { KafkaProducerModule } from '../kafka-producer/kafka-producer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
      ignoreEnvFile: process.env.APP_ENV === 'production',
      envFilePath: `.env.${process.env.APP_ENV}`,
    }),
    PrismaModule,
    KafkaProducerModule,
    AuthModule,
  ],
})
export class AppConfigModule {}
