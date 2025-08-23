import { Injectable, Inject } from '@nestjs/common';
import Stripe from 'stripe';
import { ProductOrderDto } from './dto/product.order.dto';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class StripeService {
  private stripe: Stripe
  constructor(@Inject('STRIPE_SECRET') private readonly apiKey: string, private productService: ProductService,
    private userService: UsersService) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2025-07-30.basil'
    })
  }

  async createCheckoutSession(userId: string, cartItem: ProductOrderDto[]) {
    let user = await this.userService.findUserByID(userId)
    const listItems: any = []
    for (let cart of cartItem) {
      let findProduct = await this.productService.findProductById(cart.productId)
      if (findProduct.length == 0) return { msg: 'Product Not Found' };
    }
    for (let cart of cartItem) {
      listItems.push({
        price_data: {
          currency: 'usd',
          product_data: { 
            name: cart.name,
            description: cart.description,
            images: [cart.images[0]],
            metadata: {
              productId: cart.productId,
            }
          },
          unit_amount: cart.price * 100
        },
        quantity: cart.quantity,
      })
    }
    const customer = await this.stripe.customers.create({
      name: user?.name,
      email:user?.email,
      phone:user?.phone,
    })
    const checkoutSession = await this.stripe.checkout.sessions.create({
      line_items: listItems,
      payment_method_types: ['card'],
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
      customer: customer.id,
      success_url: 'http://localhost:3000/stripe' + '/pay/success/checkout/session?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/stripe' + '/pay/failed/checkout/session',
      metadata: {
        userId: userId,
      },
    })
    return checkoutSession
  }

  async SuccessSession(sessionId: string) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items.data.price.product']
      });
      return session
    } catch (error) {
      return {success:false,message:'Error during session retriving'}
    }
  }
}
