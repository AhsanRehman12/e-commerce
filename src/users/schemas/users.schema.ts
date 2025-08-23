import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/auth/enums/role.enum";

@Schema({timestamps:true})
export class User {
  @Prop({ required: true })
  name: string
  @Prop({ required: true, unique: true })
  email: string
  @Prop({ required: true })
  password: string
  @Prop({ type: [{ type: String, enum: Role }], default: [Role.User] })
  role: Role[]
  @Prop({required:true,type:String})
  phone:string
  @Prop({ type: Date, required: true })
  dob: Date
}

export const UserSchema = SchemaFactory.createForClass(User)