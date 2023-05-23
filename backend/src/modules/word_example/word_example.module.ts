import { Module } from '@nestjs/common';
import { ServiceService } from './service/service.service';
import { ControllerController } from './controller/controller.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WordExample, WordExampleEntity } from './entity/word_example.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WordExample.name, schema: WordExampleEntity },
    ]),
  ],
  providers: [ServiceService],
  controllers: [ControllerController],
})
export class WordExamplesModule {}
