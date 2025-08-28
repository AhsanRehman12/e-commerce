import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) { }
  async sendMail(email: string, msg: string, text: string, subject: string) {
    let mail = await this.mailService.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: `<p>${msg} <b><big>${text}</big></b></p>`
    })
    return mail
  }
}
