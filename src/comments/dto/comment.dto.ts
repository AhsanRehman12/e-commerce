import { IsString } from "class-validator";

export class commentDto{
  @IsString()
  productId:string
  @IsString()
  comment:string  
}