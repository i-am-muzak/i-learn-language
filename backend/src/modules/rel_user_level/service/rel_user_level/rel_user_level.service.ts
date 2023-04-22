import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RelUserLevel,
  RelUserLevelDocument,
} from '../../entity/rel_user_level.entity';
import { Dto_CreateRelUserLevel } from '../../dto/rel_user_level.dto';
import { UserService } from 'src/modules/user/service/user.service';
import { LevelService } from 'src/modules/level/service/level.service';

@Injectable()
export class RelUserLevelService {
  constructor(
    @InjectModel(RelUserLevel.name)
    private relUserLevel: Model<RelUserLevelDocument>,
    private readonly userService: UserService,
    private readonly levelService: LevelService,
  ) {}

  async create(createDto: Dto_CreateRelUserLevel): Promise<RelUserLevel> {
    try {
      const isExist = await this.findOneById(
        createDto.user_id,
        createDto.level_id,
      );

      if (isExist) {
        if (isExist.is_completed) {
          throw new HttpException(
            'This user has completed this level already.',
            HttpStatus.BAD_REQUEST,
          );
        }
        throw new HttpException(
          'This user is currently in this level.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const isUserExist = await this.userService.findOneById(createDto.user_id);

      if (!isUserExist) {
        throw new HttpException(
          'There is no such user.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const isLevelExist = await this.levelService.findById(createDto.level_id);

      if (!isLevelExist) {
        throw new HttpException(
          'There is no such level.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (!isUserExist) {
        throw new HttpException(
          'There is no such user.',
          HttpStatus.BAD_REQUEST,
        );
      }

      var rel_user_level = new this.relUserLevel({
        user_id: createDto.user_id,
        level_id: createDto.level_id,
        created_at: new Date(),
        is_completed: createDto.is_completed,
      });

      return await rel_user_level.save();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<RelUserLevel[]> {
    return this.relUserLevel.find().exec();
  }

  async findOneById(user_id: string, level_id: string): Promise<RelUserLevel> {
    return await this.relUserLevel.findOne({
      user_id,
      level_id,
    });
  }
}
