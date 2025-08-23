import { Controller, Headers, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { RawBodyRequest } from 'src/RawBodyRequest';
import Stripe from 'stripe';
import { OrderService } from 'src/order/order.service';
import { ProductOrderDto } from 'src/order/dto/product.order.dto';

@Controller('webhook')
export class WebhookController {
  private stripe: Stripe
  private webhook: string
  constructor(private orderService: OrderService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET!, {
      apiVersion: '2025-07-30.basil'
    })
    this.webhook = process.env.STRIPE_WEBHOOK_SECRET!
  }

  @Post()
  async handleWebHook(@Headers('stripe-signature') signature: string, @Req() req: RawBodyRequest, @Res() res: Response) {
    let event: any = this.stripe.events;
    try {
      event = this.stripe.webhooks.constructEvent(
        req.rawBody!,
        signature,
        this.webhook
      )
    } catch (error) {
      return res.status(400).send(`webhook Error:${error.message}`)
    }

    if (event.type == 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const fullSession = await this.stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items.data.price.product']
      })
      const items = fullSession.line_items?.data.map((item) => ({
        stripeProductId: (item.price?.product as Stripe.Product).id,
        productId: (item.price?.product as Stripe.Product).metadata.productId,
        name: (item.price?.product as Stripe.Product).name,
        price: (item.price?.unit_amount ?? 0) * 100,
        images: (item.price?.product as Stripe.Product).images,
        description: (item.price?.product as Stripe.Product).description,
        quantity: item.quantity,
        amount_total: item.amount_total
      }))
      const customer_info = {
        customer_details: session?.customer_details?.address,
        name: session?.customer_details?.name,
        phone: session?.customer_details?.phone,
        email: session?.customer_details?.email
      }
      this.orderService.createOrder(session?.metadata?.userId, items, customer_info);
    }
    return res.status(200).send('Webhook received successfully.');
  }
}
