import { Type } from "class-transformer"
import { IsNumber, IsString, ValidateNested } from "class-validator"
class StripeAddressDto {
  @IsString()
  city: string | null
  @IsString()
  country: string | null
  @IsString()
  line1: string | null
  @IsString()
  line2: string | null
  @IsNumber()
  postal_code: string | null
  @IsString()
  state: string | null
}
export class AddressDto {
  @ValidateNested()
  @Type(() => StripeAddressDto)
  customer_details: StripeAddressDto | null | undefined
  @IsString()
  name: string | null | undefined
  @IsString()
  email: string | null | undefined
  @IsString()
  phone: string | null | undefined
}