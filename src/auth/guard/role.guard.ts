import { CanActivate, mixin, Type } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

export type Role = 'admin' | 'user';
const RoleGuard = (role: Role[]): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard implements CanActivate {
    async canActivate(context) {
      await super.canActivate(context);

      const user = context.switchToHttp().getRequest().user;
      return user && role.includes(user.role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
