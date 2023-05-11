import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'login') {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    super({ userNameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.usersService.getUser(email);
    const isValid = await bcrypt.compare(password, user?.password);
    if (!isValid)
      throw new UnauthorizedException('Email or password incorrect');
    return this.jwtService.sign({ sub: user._id, role: user.role });
  }
}
