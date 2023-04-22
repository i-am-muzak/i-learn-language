import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { UserService } from '../user/service/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserEntity } from '../user/entity/user.entity';
import { JwtStrategy } from './service/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from '../../constants/auth.constant';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '14d' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserEntity }]),],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, UserService]
})
export class AuthModule {}
