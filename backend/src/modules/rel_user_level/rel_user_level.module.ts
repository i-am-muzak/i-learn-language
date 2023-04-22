import { Module } from '@nestjs/common';
import { RelUserLevelController } from './controller/rel_user_level.controller';
import { RelUserLevelService } from './service/rel_user_level/rel_user_level.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RelUserLevel,
  RelUserLevelEntity,
} from './entity/rel_user_level.entity';
import { UserService } from '../user/service/user.service';
import { LevelService } from '../level/service/level.service';
import { User, UserEntity } from '../user/entity/user.entity';
import { Level, LevelEntity } from '../level/entity/level.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RelUserLevel.name, schema: RelUserLevelEntity },
      { name: User.name, schema: UserEntity },
      { name: Level.name, schema: LevelEntity },
    ]),
  ],
  controllers: [RelUserLevelController],
  providers: [RelUserLevelService, UserService, LevelService],
})
export class RelUserLevelModule {}
