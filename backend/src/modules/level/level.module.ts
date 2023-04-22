import { Module } from '@nestjs/common';
import { LevelController } from './controller/level.controller';
import { LevelService } from './service/level.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Level, LevelEntity } from './entity/level.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Level.name, schema: LevelEntity }]),
  ],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}
