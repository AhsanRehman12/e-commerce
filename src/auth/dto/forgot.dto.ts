import { IsString } from "class-validator";

export class ForGotPasswordDto{
  @IsString()
  email:string
}

export class ResetPasswordDto{
  @IsString()
  password:string
}