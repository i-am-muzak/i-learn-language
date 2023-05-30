import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Word, WordDocument } from '../entity/word.entity';
import {
  UserWords,
  UserWordsDocument,
} from '../../user_words/entity/user_words.entity';
import { Model } from 'mongoose';
import { CreateWordsDto } from '../dto/word.dto';

@Injectable()
export class WordService {
  constructor(
    @InjectModel(Word.name) private wordModel: Model<WordDocument>,
    @InjectModel(UserWords.name)
    private userWordsModel: Model<UserWordsDocument>,
  ) {}

  async create(createWordsDto: CreateWordsDto) {
    try {
      for (let i = 0; i < createWordsDto.words.length; i++) {
        const word = createWordsDto.words[i];

        const isExist = await this.wordModel.findOne({
          word: word,
        });

        // Add the word into DB if not exists.
        if (!isExist) {
          const instance = new this.wordModel({
            word: word,
            definition: null,
            british_audio: null,
            us_audio: null,
          });

          await instance.save();
        }
      }
    } catch (error) {
      Logger.error(error);
    }
  }

  async getRandomWords(size: number): Promise<Word[]> {
    const userWords = await this.userWordsModel
      .find({
        user_id: '6475132b6f584d01cc1d49fe',
      })
      .exec();
    const wordIds = [];
    userWords.forEach((userWord) => {
      wordIds.push(userWord.word_id);
    });

    return await this.wordModel.aggregate([
      {
        $sample: {
          size: size,
        },
      },
      {
        $match: { _id: { $not: { $in: wordIds } } },
      },
      {
        $group: {
          _id: "$_id",
          document: { $push: "$$ROOT" }
        }
      }
    ]);
  }
}
