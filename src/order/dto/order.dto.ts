import { IsArray, IsObject, IsString } from "class-validator";

export class OrderDto {
  @IsString()
  status: string
  @IsObject()
  shippingAddress: object
  @IsArray()
  items:Array<Object>
}