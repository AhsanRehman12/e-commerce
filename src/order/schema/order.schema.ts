import { Prop, Schema } from '@nestjs/mongoose'
Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  userId: string
  @Prop({
    type: [
      {
        productId: { type: String, required: true },
        quantity: { type: String, required: Number },
        name: { type: String, required: true },
        price: { type: Number, required: true }
      },
    ]
  })
  list_Items: {
    productId: string,
    quantity: number,
    name: string,
    price: number
  }[]
  @Prop({ required: true })
  amount_total: number
  @Prop({ default: 'pending' })
  status: string
}