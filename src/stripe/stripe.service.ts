import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { Cart } from './cart.model';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET!, {
      apiVersion: '2025-07-30.basil'
    });
  }
  checkOut(cart: Cart) {
    const totalPrice = cart.reduce((acc, total) => acc + total.quantity * total.price, 0)
    return this.stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: 'usd',
      payment_method_types: ['card']
    })
  }
}
