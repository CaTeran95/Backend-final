import {
  Controller,
  Get,
  Render,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller()
export class RenderController {
  @UseGuards(JwtAuthGuard)
  @Get()
  @Render('pages/index')
  getIndex() {}

  @Get('login')
  @Render('pages/session/login')
  getLogin() {}

  @Get('register')
  @Render('pages/session/register')
  getRegister() {}

  @UseGuards(JwtAuthGuard)
  @Get('chat')
  @Render('pages/chat')
  getChat() {}

  @Get('error')
  getError(@Request() req, @Response() res) {
    const { message, status } = req.session;
    res.render('pages/error', { status, message });
  }

  @UseGuards(JwtAuthGuard)
  @Render('pages/products')
  @Get('products')
  getProducts() {}
  
  @UseGuards(JwtAuthGuard)
  @Render('pages/cart')
  @Get('cart')
  getCart() {}
}
