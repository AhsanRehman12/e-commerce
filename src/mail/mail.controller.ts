import { Body, Controller, Get, Res, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) { }
  // @UseGuards(AuthGuard('jwt'))
  // @Get()
  // sendMail(@Res() response: any, @Body() email: string, @Body() text: string, @Body() subject: string) {
  //   this.mailService.sendMail(email, text, subject);
  //   return response.status(200).json({
  //     message: 'Check you email. Thanks!',
  //   })
  // }
}
