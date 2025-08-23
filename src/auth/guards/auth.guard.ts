import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserAuthenticationGuard implements CanActivate {
  constructor(private userService: UsersService) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const userId = request?.user?.userId;
    const User = await this.userService.findUserByID(userId);
    if (!User) throw new UnauthorizedException();
    return true;
  }
}