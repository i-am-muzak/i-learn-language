import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../entity/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isExist = await this.findOneByEmail(createUserDto.email);

    if (isExist) {
      throw new HttpException(
        'Email is already in use.',
        HttpStatus.BAD_REQUEST,
        {
          cause: new Error('Email is already in use.'),
        },
      );
    }

    try {
      var user = new this.userModel({
        email: createUserDto.email,
        password: await bcrypt.hash(
          createUserDto.password,
          process.env.BCRYPT_SALT,
        ),
      });

      return await user.save();
    } catch (error) {
      throw new HttpException('An error occured while registering.', 400, {
        cause: new Error('An error occured while registering.'),
      });
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({
      email: email,
    });
  }

  async findOneById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
