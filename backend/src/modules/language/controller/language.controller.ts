import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LanguageService } from '../service/language/language.service';
import { Language } from '../entity/language.entity';
import { Dto_CreateLanguage } from '../dto/language.dto';

@Controller('language')
export class LanguageController {
    constructor(private readonly languageService: LanguageService) {}

    @Get("all")
    fetchAllLanguages(): Promise<Language[]> {
        return this.languageService.findAll()
    }

    @Post("create")
    @UsePipes(new ValidationPipe())
    createNewLanguage(@Body() createLanguageDto: Dto_CreateLanguage): Promise<Language> {
        return this.languageService.create(createLanguageDto)
    }
}
