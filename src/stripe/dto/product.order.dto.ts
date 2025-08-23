import { IsNumber, IsString } from "class-validator";

export class ProductOrderDto {
  @IsString()
  productId: string
  @IsString()
  userId: string
  @IsString()
  name: string
  @IsString()
  images: string
  @IsString()
  description: string
  @IsNumber()
  price: number
  @IsNumber()
  quantity: number
}