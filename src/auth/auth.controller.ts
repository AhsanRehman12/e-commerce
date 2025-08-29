import { Body, Controller, Post, Get, Param, UseGuards, Req, Patch, Request } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from './enums/role.enum';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { MailService } from 'src/mail/mail.service';
import { ForGotPasswordDto, ResetPasswordDto } from './dto/forgot.dto';
import { UsersService } from 'src/users/users.service';
import { GenerateOtp } from 'src/utils/generateOtp';
import { AuthenticatedRequest } from 'src/utils/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    private emailService: MailService,
    private userService: UsersService
  ) { }
  @Post('signUp')
  SignUp(@Body() dto: RegisterDto) {
    return this.authService.RegisterUser(dto);
  }
  @Post('login')
  Login(@Body() dto: LoginDto) {
    return this.authService.LoginUser(dto)
  }
  @Post('forgot-password')
  ForGotPassword(@Body() body: ForGotPasswordDto) {
    let user = this.userService.findUserByEmail(body.email);
    if (!user) return { message: 'Email Not Found! Try to SignUp' }
    let otp = GenerateOtp();
    let msg = `Here's your otp! Don't share this with anyone`
    return this.emailService.sendMail(body.email, msg, otp, 'Password Reset')
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  Logout(@Request() req: AuthenticatedRequest) {
    return this.authService.Logout(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('reset-password')
  ResetPassword(@Req() req: AuthenticatedRequest, @Body() body: ResetPasswordDto) {
    return this.authService.ResetPassword(req.user.userId, body.password);
  }

  @Get('admin-route')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  getAdmin(@Req() req: any) {
    return 'hello users';
  }
}
