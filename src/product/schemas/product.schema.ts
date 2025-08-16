import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "src/users/schemas/users.schema";

@Schema({timestamps:true})
export class Product {
  @Prop({ required: true })
  name: string
  @Prop({ required: true })
  image: string
  @Prop({ required: true })
  description: string
  @Prop({ required: true })
  price: number
  @Prop({ required: true })
  category: string
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: Types.ObjectId
}

export const ProductSchema = SchemaFactory.createForClass(Product)