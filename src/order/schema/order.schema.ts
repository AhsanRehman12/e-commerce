import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Customer, CustomerSchema } from './customerdetail.schema'
import { Types } from 'mongoose'
import { User, UserSchema } from 'src/users/schemas/users.schema'
import { Product, ProductSchema } from 'src/product/schemas/product.schema'
@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: Types.ObjectId, ref: User.name, schema: UserSchema })
  userId: string
  @Prop({
    type: [
      {
        productId: { type: Types.ObjectId, ref: Product.name, schema: ProductSchema, required: true },
        quantity: { type: String, required: Number },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        amount_total: { type: Number, required: true },
        images: { type: Array, required: true }
      },
    ]
  })
  list_Items: {
    productId: string,
    name: string,
    quantity: number,
    price: number,
    amount_total: number
  }[]

  @Prop({ type: CustomerSchema })
  customerDetail: Customer
  @Prop({ default: 'pending' })
  status: string
}

export const OrderSchema = SchemaFactory.createForClass(Order)