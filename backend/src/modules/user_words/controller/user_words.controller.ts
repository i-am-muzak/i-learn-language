import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserWordService } from '../service/user_words.service';
import { CreateUserWordDto } from '../dto/user_words.dto';
import { UserWords } from '../entity/user_words.entity';

@Controller('user-words')
export class ControllerController {
  constructor(private readonly userWordService: UserWordService) {}

  @Post('/create')
  @UsePipes(new ValidationPipe())
  createUserWord(
    @Body() createUserWordDto: CreateUserWordDto,
  ): Promise<UserWords> {
    return this.userWordService.createUserWord(createUserWordDto);
  }
}
