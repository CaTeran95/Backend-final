import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { LoginAuthGuard } from '../guards/login-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RegisterGuard } from '../guards/register.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth')
export class AuthController {
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

  @UseGuards(LoginAuthGuard)
  @Post('register')
  async register() {
    // async register(@Body() payload) {
    // console.log('Register payload', payload);
    // const newUser = await this.authService.registerUser(payload);
    // return { redirect: '/login' };
  }
}
