import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { LanguageModule } from './modules/language/language.module';
import { AuthModule } from './modules/auth/auth.module';
import { WordModule } from './modules/word/word.module';
import { DatabaseModule } from './database/database.module';
import { UserWordsModule } from './modules/user_words/user_words.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    LanguageModule,
    AuthModule,
    WordModule,
    UserWordsModule,
  ],
  controllers: [],
})
export class AppModule {}
