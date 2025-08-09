import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from "src/constants/jwtConstant";
import { User } from "src/users/schemas/users.schema";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.jwtSecret
    })
  }

  async validate(payload: any) { 
    return {
      userId: payload.sub,
      name: payload.name,
      role: payload.role,
    };
  }
}