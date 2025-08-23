import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
@Schema()
export class Shipping {
  @Prop()
  city:string
  @Prop()
  countary:string
  @Prop()
  line1:String
  @Prop()
  line2:String
  @Prop()
  postal_code:string
}

export const ShippingSchema = SchemaFactory.createForClass(Shipping)