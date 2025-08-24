import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Product, ProductSchema } from "src/product/schemas/product.schema";
import { User, UserSchema } from "src/users/schemas/users.schema";

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: Types.ObjectId, ref: User.name, schema: UserSchema })
  userId: Types.ObjectId
  @Prop({type:Types.ObjectId,ref:Product.name,schema:ProductSchema})
  productId:Types.ObjectId
  @Prop({required:true})
  comment:string
}


export const CommentSchema = SchemaFactory.createForClass(Comment);