import { Get, Controller, Post, Res, Query, Body, UseGuards, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from 'src/utils/user.interface';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) { }
  @UseGuards(AuthGuard('jwt'))
  @Post('create-payment-intent')
  createPaymentIntent(@Req() req:AuthenticatedRequest,@Body() cartItem:any) {
    return this.stripeService.createCheckoutSession(req.user.userId,cartItem);
  }

  @Get('pay/success/checkout/session')
  SucessSession(@Query('session_id') sessionId: string) {
    return this.stripeService.SuccessSession(sessionId);
  }
}
