import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  name: string
  @IsEmail()
  email: string
  @IsString()
  @MinLength(6)
  password: string
  @IsString()
  @MinLength(6)
  confirmPassword: string
  @IsDateString()
  @IsNotEmpty()
  dob: string
  @IsNumber()
  phone:string
}