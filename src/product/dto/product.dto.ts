import { IsNumber, IsString } from "class-validator";

export class ProductDto{
  @IsString()
  name:string;
  @IsString()
  description:string
  @IsNumber()
  price:number
  @IsString()
  category:string
  @IsString()
  image:string
  @IsString()
  userId:string
}[]
