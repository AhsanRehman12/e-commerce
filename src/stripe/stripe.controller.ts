import { Get, Controller, Post, Res, Query, Body, UseGuards, Req, UseFilters } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from 'src/utils/user.interface';
import { ProductOrderDto } from './dto/product.order.dto';
import { UserAuthenticationGuard } from 'src/auth/guards/auth.guard';
import { AuthExceptionFilter } from 'src/auth/exceptions/auth.exception';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) { }
  @UseGuards(AuthGuard('jwt'), UserAuthenticationGuard)
  @UseFilters(AuthExceptionFilter)
  @Post('create-payment-intent')
  createPaymentIntent(@Req() req: AuthenticatedRequest, @Body() cartItem: ProductOrderDto[]) {
    return this.stripeService.createCheckoutSession(req.user.userId, cartItem);
  }

  @Get('pay/success/checkout/session')
  SucessSession(@Query('session_id') sessionId: string) {
    return this.stripeService.SuccessSession(sessionId);
  }
}
