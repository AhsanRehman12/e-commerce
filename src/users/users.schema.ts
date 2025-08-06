import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
  @Prop({ required: true })
  name: string
  @Prop({ required: true, unique: true })
  email: string
  @Prop({ required: true })
  password: string
  @Prop({ default: 'user' })
  role: string
  @Prop({ type: Date, required: true })
  dob:Date
}

export const UserSchema = SchemaFactory.createForClass(User)