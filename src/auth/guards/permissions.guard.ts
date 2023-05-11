import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/users/entities/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { SELF_KEY } from '../decorators/self.decorator';
import { Types } from 'mongoose';

const checkProperty = (
  userProperty: Types.ObjectId | Types.ObjectId[],
  paramsProperty: string,
): boolean => {
  if (Array.isArray(userProperty)) {
    return userProperty.some(
      (property) => property.toString() === paramsProperty,
    );
  } else {
    return userProperty.toString() == paramsProperty;
  }
};

/*

Permissions guard determines if users can access certain endpoint due their role or if they are the owners of the document. To activate each one you should include @Roles() or @Self() decorators in your controller's method.

The first check is to verify if the document accessed is user's document. If that's the case, user will access. Otherwise the guard will do an additional check based on user's role.

If there are not roles defined to the method, and the user didn't pass the self check, the guard will deny access.

*/

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    
    /* Self user permission guarding: */
    const selfProperty = this.reflector.get(SELF_KEY, context.getHandler());
    if (selfProperty) {
      const { params } = context.switchToHttp().getRequest();
      const isAllowed = checkProperty(user[selfProperty], params[selfProperty]);
      if (isAllowed) return true;
    }
    
    /* Allowed roles permission guarding: */
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return false;
    return requiredRoles.some((role) => user.role === role);
  }
}
