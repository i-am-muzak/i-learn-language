import { Module } from '@nestjs/common';
import { ServiceService } from './service/service.service';
import { ControllerController } from './controller/controller.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WordSynonym, WordSynonymEntity } from './entity/word_synonym.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WordSynonym.name, schema: WordSynonymEntity },
    ]),
  ],
  providers: [ServiceService],
  controllers: [ControllerController],
})
export class WordSynonymModule {}
