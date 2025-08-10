import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "src/users/schemas/users.schema";

@Schema()
export class Order {
  @Prop({
    type: [{
      ProductId: { type: Types.ObjectId, ref: 'Product' },
      quantity: { type: Number},
      price: { type: Number}
    }],required:true
  })
  items: {
    ProductId: Types.ObjectId,
    quantity: number,
    price: number
  }
  @Prop({ required: true, type: Types.ObjectId, ref: User.name  })
  userId: Types.ObjectId
  @Prop({ default: 'pending' })
  status: string
  @Prop({ required: true })
  totalPrice: number
  @Prop({ type: Object, required: true })
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export const OrderSchema = SchemaFactory.createForClass(Order)