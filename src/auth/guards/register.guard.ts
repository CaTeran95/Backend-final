import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RegisterGuard extends AuthGuard('register') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err) {
      console.log('Register error: ', err);
    }
    if (info) {
      console.log('Register info: ', info);
    }
    return user;
  }
}
