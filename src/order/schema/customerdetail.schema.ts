import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { Shipping, ShippingSchema } from './shippingaddress.schema'
@Schema()
export class Customer {
  @Prop({ type: ShippingSchema })
  shippingAddress: Shipping
  @Prop({ required: true })
  email: string
  @Prop({ required: true })
  name: string
  @Prop({ required: true })
  phone: number
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
