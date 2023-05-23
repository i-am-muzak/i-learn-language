import { Module } from '@nestjs/common';
import { ControllerController } from './controller/user_words.controller';
import { ServiceService } from './service/user_words.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserWords, UserWordsEntity } from './entity/user_words.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserWords.name, schema: UserWordsEntity },
    ]),
  ],
  controllers: [ControllerController],
  providers: [ServiceService],
})
export class UserWordsModule {}
