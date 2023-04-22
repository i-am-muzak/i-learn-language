import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { User } from '../../user/entity/user.entity';
import { CreateUserDto, LoginUserDto } from '../../user/dto/user-dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/interfaces/user.interfaces';
import { AuthResponse } from 'src/interfaces/auth.interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<AuthResponse> {
    const user = await this.userService.findOneByEmail(loginUserDto.email);

    if (!user) {
      throw new HttpException(
        'Email or password not matched.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const is_valid = await bcrypt.compare(loginUserDto.password, user.password);

    if (!is_valid) {
      throw new HttpException(
        'Email or password not matched.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload: JwtPayload = {
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
