import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../entities/message.entity';
import { Model } from 'mongoose';
import { CreateMessageDTO } from '../dtos/message.dto';
import { Role } from 'src/users/entities/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messagesModel: Model<Message>,
  ) {}

  create(user: string, userRole: Role, body: string) {
    const origin = userRole === Role.USER ? 'user' : 'system';
    const newMessage = new this.messagesModel({ user, origin, body });
    return newMessage.save();
  }

  async findAll(): Promise<Message[]> {
    const messages = await this.messagesModel.find().populate({
      path: 'user',
      select: ['name', 'email', 'avatar'],
    });
    return messages;
  }

  findOwn(userID: string): Promise<Message[]> {
    return this.messagesModel.find({ user: userID }).populate({
      path: 'user',
      select: ['name', 'email', 'avatar'],
    });
  }
}
