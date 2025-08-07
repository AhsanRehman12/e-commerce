import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../enums/role.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {  }
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (!requiredRoles) return true
    const request = context.switchToHttp().getRequest();
    console.log(request.user)
    const user = request.user
    if (Array.isArray(user?.role)) {
      return user.role.some((role: Role) => requiredRoles.includes(role));
    }

    return requiredRoles.includes(user?.role);
  }
}