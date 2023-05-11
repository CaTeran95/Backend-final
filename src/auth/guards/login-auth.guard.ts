import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginAuthGuard extends AuthGuard('login') {
  handleRequest(err, user, info, context: ExecutionContext, status?: any) {
    const res = context.switchToHttp().getResponse();
    if (err) {
      throw new HttpException(err.message, err.status);
    }
    res.cookie('jwt', user, { httpOnly: true });
    res.status(200).redirect('/');
    return user;
  }
}
