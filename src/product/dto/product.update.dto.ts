import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProduct {
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description: string
  @IsOptional()
  @IsNumber()
  price: number
  @IsOptional()
  @IsString()
  category: string
  @IsOptional()
  @IsString()
  image: string
}