import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '~/core/auth/decorators/roles.decorator';
import { TokenPayloadDto } from '~/core/auth/dtos/token-payload.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as TokenPayloadDto;
    if (!roles.includes(user.role)) {
      throw new ForbiddenException();
    }
    return true;
  }
}
