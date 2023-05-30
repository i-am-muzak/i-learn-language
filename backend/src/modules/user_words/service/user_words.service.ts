import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserWords, UserWordsDocument } from '../entity/user_words.entity';
import { Model } from 'mongoose';
import { CreateUserWordDto } from '../dto/user_words.dto';

@Injectable()
export class UserWordService {
  constructor(
    @InjectModel(UserWords.name)
    private userWordModel: Model<UserWordsDocument>,
  ) {}

  async createUserWord(
    createUserWordDto: CreateUserWordDto,
  ): Promise<UserWords> {
    const isExist = await this.userWordModel.findOne({
      user_id: createUserWordDto.user_id,
      word_id: createUserWordDto.word_id,
    });

    if (isExist) {
      throw new HttpException('It is already added.', HttpStatus.BAD_REQUEST, {
        cause: new Error('It is already added.'),
      });
    }

    try {
      const instance = new this.userWordModel({
        user_id: createUserWordDto.user_id,
        word_id: createUserWordDto.word_id,
      });

      return await instance.save();
    } catch (error) {
      Logger.error(error);
    }
  }
}
