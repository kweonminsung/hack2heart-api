import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { GeminiService } from './gemini.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [HttpModule],
  controllers: [CommonController],
  providers: [CommonService, GeminiService],
  exports: [CommonService],
})
export class CommonModule {}
