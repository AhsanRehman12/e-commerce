import { Types } from "mongoose"

export class JwtTokenDto{
  _id:Types.ObjectId
  name:string
  role:string
}