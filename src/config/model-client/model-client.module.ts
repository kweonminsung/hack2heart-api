import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MODEL_CLIENT } from './model-client.constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ModelClientService } from './model-client.service';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: MODEL_CLIENT,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService) => ({
          transport: Transport.GRPC,
          options: {
            package: ['model', 'test'],
            protoPath: [
              join(process.cwd(), 'proto/model.proto'),
              join(process.cwd(), 'proto/test.proto'),
            ],
            url: configService.get('model.server_url'),
            loader: {
              keepCase: true,
              defaults: true,
            },
          },
        }),
      },
    ]),
  ],
  providers: [ModelClientService],
  exports: [ModelClientService],
})
export class ModelClientModule {}
