import { parseToken } from '@app/auth/utils/jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { iRoles } from '../interfaces/user';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndMerge<iRoles[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (roles.length < 1) return true;

    const token = context
      .switchToHttp()
      .getRequest()
      .headers?.authorization?.split(' ')?.[1];

    if (!token) return false;

    const data: any = parseToken(token);
    if (!data) return false;

    if (!roles.includes(data.role)) return false;

    return true;
  }
}