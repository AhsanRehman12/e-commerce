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
      const items = fullSession.line_items?.data.map((item) => {
        const product = item.price?.product as Stripe.Product;
        return {
          stripeProductId: product.id,
          productId: product.metadata.productId,
          name: product.name,
          price: (item.price?.unit_amount ?? 0) * 100,
          images: product.images,
          description: product.description,
          quantity: item.quantity,
          amount_total: item.amount_total
        }
      })

      const customerInfo = session?.customer_details;
      const customer_info = {
        customer_details: customerInfo?.address,
        name: customerInfo?.name,
        phone: customerInfo?.phone,
        email: customerInfo?.email
      }
      this.orderService.createOrder(session?.metadata?.userId, items, customer_info);
    }
    return res.status(200).send('Webhook received successfully.');
  }
}
