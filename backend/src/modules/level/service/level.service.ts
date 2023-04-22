import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Level, LevelDocument } from '../entity/level.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLevelDto } from '../dto/level.dto';

@Injectable()
export class LevelService {
  constructor(@InjectModel(Level.name) private level: Model<LevelDocument>) {}

  async create(createLevelDto: CreateLevelDto): Promise<Level> {
    try {
        const isExist = await this.findByTitleAndLanguage(createLevelDto.title, createLevelDto.language_id);
        
        if (isExist) {
          throw new HttpException("Email is already used.", HttpStatus.BAD_REQUEST)
        }

        var levelInstance = new this.level(
          {
            title: createLevelDto.title,
            language_id: createLevelDto.language_id,
            value: createLevelDto.value,
            is_active: createLevelDto.is_active
          }
        );

        return await levelInstance.save();
    } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async fetchAll(): Promise<Level[]> {
    return await this.level.find().exec();
  }

  async findById(id: string): Promise<Level> {
    return await this.level.findById(id);
  }

  async findByTitleAndLanguage(title: string, language_id: string): Promise<Level> {
    return await this.level.findOne({
      language_id: language_id,
      title: title
    })
  }
}
