import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { LoginAuthGuard } from '../guards/login-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RegisterGuard } from '../guards/register.guard';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from 'src/users/dtos/users.dto';
import { UsersService } from 'src/users/services/users.service';

@Controller('api/auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @UseGuards(LoginAuthGuard)
  @Post('login')
  async login() {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logOut(@Request() req, @Response() res) {
    delete req.user;
    res.clearCookie('jwt');
    res.status(200).redirect('/login');
  }

  // @UseGuards(RegisterGuard)
  @Post('register')
  // async register() {
  async register(@Body() payload: CreateUserDTO, @Res() res) {
    try {
      await this.usersService.create(payload);
    } catch (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json({ ok: true });
  }
}
