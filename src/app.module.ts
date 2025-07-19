import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/app.module';
import { UserModule } from './modules/user/user.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [AppConfigModule, CommonModule, UserModule],
})
export class AppModule {}
