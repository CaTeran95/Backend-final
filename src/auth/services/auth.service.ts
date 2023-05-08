import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Customer } from 'src/users/entities/customer.entity';

import { CustomersService } from 'src/users/services/customers.service';
// import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private customersService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const customer = await this.customersService.checkCustomer(username);
    if (customer?.password !== pass) {
      // throw new UnauthorizedException('Invalid username or password');
      return null;
    }
    const { password, ...result } = customer;
    console.log('Checked customer', customer);
    return result;
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
  }

  async login(user: Customer) {
    const { name, _id, role } = user;
    const payload = {
      sub: _id,
      username: `${name.firstName} ${name.lastName}`,
      role,
    };
    console.log('User', user);
    console.log('Payload', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
