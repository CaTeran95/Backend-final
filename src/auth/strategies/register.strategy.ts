import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RegisterStrategy extends PassportStrategy(Strategy, 'register') {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    super({ userNameField: 'email' });
  }

  async validate(email: string, password: string) {
    console.log('Register strategy validation.')
    console.log('Register', email, password)
  }
}
