import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Language, LanguageDocument } from '../../entity/language.entity';
import { Model } from 'mongoose';
import { Dto_CreateLanguage } from '../../dto/language.dto';

@Injectable()
export class LanguageService {
    constructor(@InjectModel(Language.name) private languageModel: Model<LanguageDocument> ) {}

    async create(createLanguageDto: Dto_CreateLanguage): Promise<Language> {
        try {
            const isExist = await this.findByTitle(createLanguageDto.title);
            
            if (isExist) {
              throw new HttpException("This language has been added already.", HttpStatus.BAD_REQUEST)
            }
    
            var languageInstance = new this.languageModel(
              {
                title: createLanguageDto.title,
                is_active: createLanguageDto.is_active,
                created_at: new Date()
              }
            );
    
            return await languageInstance.save();
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findByTitle(title: string): Promise<Language> {
        return await this.languageModel.findOne({
            title
        })
    }

    async findAll(): Promise<Language[]> {
      return await this.languageModel.find().exec()
  }
}
