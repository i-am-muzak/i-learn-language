import { Module } from '@nestjs/common';
import { LanguageController } from './controller/language.controller';
import { LanguageService } from './service/language/language.service';
import { Language, LanguageEntity } from './entity/language.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Language.name, schema: LanguageEntity }]),
  ],
  controllers: [LanguageController],
  providers: [LanguageService]
})
export class LanguageModule {}
