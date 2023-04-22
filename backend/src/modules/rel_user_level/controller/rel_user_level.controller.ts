import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RelUserLevel } from '../entity/rel_user_level.entity';
import { RelUserLevelService } from '../service/rel_user_level/rel_user_level.service';
import { Dto_CreateRelUserLevel } from '../dto/rel_user_level.dto';

@Controller('rel-user-level')
export class RelUserLevelController {
  constructor(private readonly relUserLevelService: RelUserLevelService) {}

  @Get("all")
  fetchAll(): Promise<RelUserLevel[]> {
    return this.relUserLevelService.findAll();
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createRelUserLevel(
    @Body() createDto: Dto_CreateRelUserLevel,
  ): Promise<RelUserLevel> {
    return this.relUserLevelService.create(createDto);
  }
}
