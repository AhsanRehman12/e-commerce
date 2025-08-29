import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenDto } from './dto/jwttoken.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwt: JwtService) { }
  async RegisterUser(user: RegisterDto) {
    let { password, email, confirmPassword } = user;
    if (password != confirmPassword) return { message: "Password doesn't matched" }
    let findUser = await this.userService.findUserByEmail(email);
    if (findUser) return { success: false, message: 'Email already register.' }
    let hashPassword = await this.HashPassword(password)
    return this.userService.create({
      ...user, password: hashPassword
    })
  }
  async LoginUser(user: LoginDto) {
    let { email } = user;
    let UserInfo = await this.userService.findUserByEmail(email);
    if (UserInfo) {
      let comparePassword = await bcrypt.compare(user.password, UserInfo?.password);
      if (!comparePassword) return { success: false, message: 'Wrong Credantials' }
    } else {
      return { success: false, message: "Email not found" };
    }

    return this.GenerateToken(UserInfo);
  }

  async Logout(id: string) {
    let deleteUser = await this.userService.DeleteUser(id);
    return deleteUser;
  }

  async ResetPassword(userId: string, newPassword: string) {
    let hashPassword = await this.HashPassword(newPassword);
    return this.userService.updatePassword(userId, hashPassword);
  }

  async GenerateToken(UserInfo: JwtTokenDto) {
    let payload = { sub: UserInfo._id, name: UserInfo.name, role: UserInfo.role };
    let token = await this.jwt.signAsync(payload);
    let responseObj = {
      name: UserInfo.name,
      token: token,
      success: true,
      message: 'User Login Successfully'
    }
    return responseObj
  }

  async HashPassword(password: string) {
    const hashPassword = await bcrypt.hash(password, 10)
    return hashPassword;
  }
}
