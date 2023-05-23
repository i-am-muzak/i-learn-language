import { Module } from '@nestjs/common';
import { WordController } from './controller/word.controller';
import { WordService } from './service/word.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordEntity } from './entity/word.entity';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Word.name, schema: WordEntity }]),
  ],
  controllers: [WordController],
  providers: [WordService]
})
export class WordModule {}
