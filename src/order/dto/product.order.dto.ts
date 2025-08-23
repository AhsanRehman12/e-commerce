import { IsNumber, IsString } from "class-validator";

export class ProductOrderDto{
  @IsString()
  productId?:string
  @IsString()
  name?:string
  @IsNumber()
  quantity?:number|null
  @IsNumber()
  price?:number
  @IsString()
  images:string[]
}