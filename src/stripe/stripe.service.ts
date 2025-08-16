import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  createPaymentIntent(amount: number, currency: string) {
    throw new Error('Method not implemented.');
  }
  private stripe: Stripe
  constructor(@Inject('STRIPE_SECRET') private readonly apiKey: string) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2025-07-30.basil'
    })
  }

  async createCheckoutSession(userId: string, cartItem: any[]) {
    const listItems: any = []
    for (let cart of cartItem) {
      listItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: cart.name
          },
          unit_amount: cart.price * 100
        },
        quantity: cart.quantity,
      })
    }

    const checkoutSession = await this.stripe.checkout.sessions.create({
      line_items: listItems,
      mode: 'payment',
      phone_number_collection: {
        enabled: true
      },
      shipping_address_collection: {
        allowed_countries: ['PK', 'US', 'CA']
      },
      payment_intent_data: {
        setup_future_usage: 'on_session',
      },
      customer: 'cus_SsOW6syBScP379',
      success_url: 'http://localhost:3000/stripe' + '/pay/success/checkout/session?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/stripe' + '/pay/failed/checkout/session',
      metadata: {

        userId: userId
      }
    })
    return checkoutSession
  }

  async SuccessSession(sessionId: string) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items.data.price.product']
      });
      console.log(session?.line_items,'session')
      return session
    } catch (error) {
      console.log(error)
    }
  }
}
