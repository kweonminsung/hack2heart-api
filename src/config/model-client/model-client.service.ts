import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MODEL_CLIENT } from './model-client.constant';
import { lastValueFrom } from 'rxjs';
import { Observable } from 'rxjs';

interface TestService {
  sendTestMessage(message: {
    content: string;
  }): Observable<{ content: string }>;
}

interface ModelService {
  getUserRecommendations(message: {
    user_id: number;
  }): Observable<{ user_ids: number[] }>;
}

@Injectable()
export class ModelClientService implements OnModuleInit {
  private modelService: ModelService;
  private testService: TestService;

  constructor(@Inject(MODEL_CLIENT) private client: ClientGrpc) {}

  onModuleInit() {
    this.modelService = this.client.getService<ModelService>('ModelService');
    this.testService = this.client.getService<TestService>('TestService');
  }

  async sendTestMessage(message: string) {
    return await lastValueFrom(
      this.testService.sendTestMessage({
        content: message,
      }),
    );
  }

  async getUserRecommendations(userId: number) {
    const user_ids = (
      await lastValueFrom(
        this.modelService.getUserRecommendations({
          user_id: userId,
        }),
      )
    ).user_ids;

    return user_ids;
  }
}
