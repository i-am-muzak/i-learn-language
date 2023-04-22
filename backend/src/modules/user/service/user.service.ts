import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../entity/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/user-dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
        const isExist = await this.findOneByEmail(createUserDto.email);
        
        if (isExist) {
          throw new HttpException("Email is already used.", HttpStatus.BAD_REQUEST)
        }

        var user = new this.userModel(
          {
            email: createUserDto.email,
            password: await bcrypt.hash(createUserDto.password, process.env.BCRYPT_SALT)
          }
        );

        return await user.save();
    } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne(
      {
        email: email
      }
    )
  }

  async findOneById(id: string): Promise<User> {
    return await this.userModel.findById(id)
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
