import { IsString } from "class-validator";

export class commentDto{
  @IsString()
  userId:string
  @IsString()
  productId:string
  @IsString()
  comment:string  
}