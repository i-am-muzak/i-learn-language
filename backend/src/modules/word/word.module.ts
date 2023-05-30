import { Module } from '@nestjs/common';
import { WordController } from './controller/word.controller';
import { WordService } from './service/word.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordEntity } from './entity/word.entity';
import { UserWords, UserWordsEntity } from '../user_words/entity/user_words.entity';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Word.name, schema: WordEntity }]),
    MongooseModule.forFeature([{ name: UserWords.name, schema: UserWordsEntity }]),
  ],
  controllers: [WordController],
  providers: [WordService]
})
export class WordModule {}
