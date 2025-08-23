import { IsString } from "class-validator";

export class CancelOrderDto{
  @IsString()
  userId:string
  @IsString()
  status:string
}