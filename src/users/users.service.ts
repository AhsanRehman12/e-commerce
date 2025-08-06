import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private UserModel: Model<User>) { }
  async create(UserInfo: UserDto) {
    let newUser = await this.UserModel.create(UserInfo)
    return newUser
  }
  async findUserByEmail(email: string) {
    let user = await this.UserModel.findOne({ email })
    return user;
  }
  async DeleteUserById(id: string) {
    let user = await this.UserModel.deleteOne({ _id: id });
    return user
  }
}
