import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private UserModel: Model<User>, private productService: ProductService,) { }
  async create(UserInfo: UserDto) {
    try {
      let newUser = await this.UserModel.create(UserInfo)
      return newUser

    } catch (error) {
      console.log(error)
    }
  }
  async findUserByEmail(email: string) {
    try {
      let user = await this.UserModel.findOne({ email })
      return user;
    } catch (error) {
      console.log(error)
    }
  }
  async findUserByID(userId: string) {
    try {
      const user = await this.UserModel.findById({ _id: userId });
      console.log(userId,'iddd')
      return user
    } catch (error) {

    }
  }
  async DeleteUserById(id: string) {
    try {
      let user = await this.UserModel.deleteOne({ _id: id });
      return user
    } catch (error) {
      console.log(error)
    }
  }
  async findProductByUserId(id: string) {
    try {
      const allUserProducts = await this.productService.searchProductOfUser(id);
      return allUserProducts;
    } catch (error) {
      console.log(error)
    }
  }
}