import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../entities/message.entity';
import { Model } from 'mongoose';
import { CreateMessageDTO } from '../dtos/message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messagesModel: Model<Message>,
  ) {}

  create(payload: CreateMessageDTO) {
    const newMessage = new this.messagesModel(payload);
    return newMessage.save();
  }

  findAll(): Promise<Message[]> {
    return this.messagesModel
      .find()
      .populate({
        path: 'emitter',
        select: ['name', 'email', 'avatar', 'role'],
      })
      .populate({
        path: 'receiver',
        select: ['name', 'email', 'avatar', 'role'],
      });
  }

  findOwn(customerID: string): Promise<Message[]> {
    return this.messagesModel
      .find({ $or: [{ emitter: customerID }, { receiver: customerID }] })
      .populate({
        path: 'emitter',
        select: ['name', 'email', 'avatar', 'role'],
      })
      .populate({
        path: 'receiver',
        select: ['name', 'email', 'avatar', 'role'],
      });
  }
}
