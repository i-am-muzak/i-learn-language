import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserEntity } from './entity/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserEntity }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
