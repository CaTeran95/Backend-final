import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/services/users.service';

const cookieExtractor: JwtFromRequestFunction = (req: Request) => {
  var token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: cookieExtractor,
      ignorateExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const { sub: userID, role } = payload;
    const user = await this.usersService.findOne(userID);
    if (!user) throw new NotFoundException(`User #${userID} not found`);
    const { cartID, orders } = user;
    return { userID, role, cartID, orders };
  }
}
