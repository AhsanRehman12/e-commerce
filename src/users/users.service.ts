import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';
import { ProductService } from 'src/product/product.service';
import { LoogerService } from 'src/looger/looger.service';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private UserModel: Model<User>, private loogerService: LoogerService) { }
  async create(UserInfo: UserDto) {
    try {
      let newUser = await this.UserModel.create(UserInfo)
      return newUser
    } catch (error) {
      this.loogerService.error(error);
      throw new BadRequestException(error.message)
    }
  }
  async findUserByEmail(email: string) {
    try {
      let user = await this.UserModel.findOne({ email })
      return user;
    } catch (error) {
      this.loogerService.error(error);
      throw new BadRequestException(error.message)
    }
  }
  async findUserByID(userId: string) {
    try {
      const user = await this.UserModel.findById({ _id: userId });
      return user
    } catch (error) {
      this.loogerService.error(error);
      throw new NotFoundException(error.message)
    }
  }


  async UpdateUser(UserData: UserDto, userId: string) {
    try {
      let updatedUser = await this.UserModel.findByIdAndUpdate(userId, UserData, { new: true })
      return updatedUser;
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  async DeleteUser(id: string) {
    try {
      let user = await this.UserModel.deleteOne({ _id: id });
      return user
    } catch (error) {
      this.loogerService.error(error);
      throw new NotFoundException(error.message)
    }
  }

  async updatePassword(userId: string, newPassword: string) {
    let resetPassword = await this.UserModel.findByIdAndUpdate(userId, { password: newPassword }, { new: true })
    return resetPassword;
  }
}