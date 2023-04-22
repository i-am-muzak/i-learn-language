import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { LevelModule } from './modules/level/level.module';
import { ConfigModule } from '@nestjs/config';
import { RelUserLevelModule } from './modules/rel_user_level/rel_user_level.module';
import { LanguageModule } from './modules/language/language.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true
      }
    ),
    MongooseModule.forRoot('mongodb://localhost:27017/dev', {autoIndex: true}),
    UserModule,
    LevelModule,
    RelUserLevelModule,
    LanguageModule,
    AuthModule
  ],
  controllers: [],
})


export class AppModule {}
