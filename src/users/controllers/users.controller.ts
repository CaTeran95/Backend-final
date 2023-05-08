import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':productID')
  getOne(@Param('productID', MongoIdPipe) productID: string) {
    return this.usersService.findOne(productID);
  }

  @Post()
  create(@Body() payload: CreateUserDTO) {
    return this.usersService.create(payload);
  }

  @Put(':userID')
  update(
    @Body() payload: UpdateUserDTO,
    @Param('userID', MongoIdPipe) userID: string,
  ) {
    return this.usersService.update(userID, payload);
  }

  @Delete(':userID')
  delete(@Param('userID', MongoIdPipe) userID: string) {
    return this.usersService.delete(userID);
  }
}
