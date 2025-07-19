import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/app.module';
import { UserModule } from './modules/user/user.module';
import { CommonModule } from './common/common.module';
import { ChatroomModule } from './modules/chatroom/chatroom.module';

@Module({
  imports: [AppConfigModule, CommonModule, UserModule, ChatroomModule],
})
export class AppModule {}
