import { Body, Controller, Post,Get, Param, Delete } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post('signUp')
  SignUp(@Body() dto: RegisterDto) {
    return this.authService.RegisterUser(dto);
  }
  @Post('login')
  Login(@Body() dto: LoginDto) {
    return this.authService.LoginUser(dto)
  }
  @Delete('logout/:id')
  Logout(@Param('id') id:string) {
    return this.authService.Logout(id);
   }
}
