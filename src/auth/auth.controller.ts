import { Body, Controller, Post, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from './enums/role.enum';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

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
  Logout(@Param('id') id: string) {
    return this.authService.Logout(id);
  }

  @Get('admin-route')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  getAdmin(@Req() req: any) {
    return 'hello users';
  }
}
