import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WordService } from '../service/word.service';
import { CreateWordsDto } from '../dto/word.dto';
import { Word } from '../entity/word.entity';
import { WordSerializer } from '../serializer/word.serializer';

@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  createRelUserLevel(@Body() createWordsDto: CreateWordsDto) {
    this.wordService.create(createWordsDto);

    return {
      success: true,
      message: 'Words are updated.',
    };
  }

  @Get('random')
  @UseInterceptors(WordSerializer)
  async getRandomWords(): Promise<Word[]> {
    const words = await this.wordService.getRandomWords(10);

    return words;
  }
}
