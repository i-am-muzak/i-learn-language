import { Module } from '@nestjs/common';
import { TTSController } from './controller/tts.controller';

@Module({
  controllers: [TTSController]
})
export class TtsModule {}
