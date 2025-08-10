import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Cart } from './cart.model';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) { }
  @Post()
  checkOut(@Body() body: { cart: Cart }) {
    try {
      return this.stripeService.checkOut(body.cart);
    } catch (error) {
      return error;
    }
  }
}
