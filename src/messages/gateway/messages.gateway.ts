import { InjectModel } from '@nestjs/mongoose';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Message } from '../entities/message.entity';
import { Model } from 'mongoose';
import { Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { MessagesService } from '../services/messages.service';
import { Role } from 'src/users/entities/user.entity';

// const cookieExtractor: JwtFromRequestFunction = (cookies) => {
//   var token = null;
//   if (cookies) token = req.cookies['jwt'];
//   return token;
// };

const formatCookies = (input: string) => {
  const rawCookies = input.split('; ');
  let cookies = {};
  rawCookies.map((cookie) => {
    const [key, value] = cookie.split('=');
    cookies[key] = value;
  });
  return cookies;
};

@WebSocketGateway()
export class MessagesGateway {
  constructor(
    @InjectModel(Message.name) private messagesModel: Model<Message>,
    private jwtService: JwtService,
    private messagesService: MessagesService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(client: any, payload: any) {
    const { cookie } = client.handshake.headers;
    const newCookies = formatCookies(cookie);
    const { sub, role } = <{ [key: string]: string }>(
      this.jwtService.decode(newCookies['jwt'])
    );
    const newMessage = await this.messagesService.create(
      sub,
      <Role>role,
      payload.message,
    );
    const pMessage = await newMessage.populate({
      path: 'user', 
      select: ['name', 'alias', 'avatar']
    });
    return this.server.emit('newMessage', pMessage);
  }
}
