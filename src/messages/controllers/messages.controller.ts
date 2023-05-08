import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDTO } from '../dtos/message.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  create(@Body() payload: CreateMessageDTO) {
    return this.messagesService.create(payload);
  }

  @Get()
  getAll() {
    return this.messagesService.findAll();
  }

  @Get(':customerID')
  getOwn(@Param('customerID', MongoIdPipe) customerID: string) {
    return this.messagesService.findOwn(customerID);
  }
}
