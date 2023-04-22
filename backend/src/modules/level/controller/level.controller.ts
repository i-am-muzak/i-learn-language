import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LevelService } from '../service/level.service';
import { CreateLevelDto } from '../dto/level.dto';
import { Level } from '../entity/level.entity';

@Controller('level')
export class LevelController {
    constructor(private readonly levelService: LevelService) {}

    @Post("create")
    @UsePipes(new ValidationPipe())
    async createLevel(@Body() createLevelDto: CreateLevelDto): Promise<Level> {
        return await this.levelService.create(createLevelDto)
    }

    @Get("all")
    async fetchAllLevels(): Promise<Level[]> {
        return await this.levelService.fetchAll()
    }
}
