import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateCustomerDTO, UpdateCustomerDTO } from '../dtos/customers.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Post()
  create(@Body() payload: CreateCustomerDTO) {
    console.log('Payload', payload);
    return this.customerService.create(payload);
  }

  @Get()
  getAll() {
    return this.customerService.findAll();
  }

  @Get(':customerID')
  getOne(@Param('customerID', MongoIdPipe) customerID: string) {
    return this.customerService.findOne(customerID);
  }

  @Put(':customerID')
  update(
    @Body() payload: UpdateCustomerDTO,
    @Param('customerID', MongoIdPipe) customerID: string,
  ) {
    return this.customerService.update(customerID, payload);
  }

  @Delete(':customerID')
  delete(@Param('customerID', MongoIdPipe) customerID: string) {
    return this.customerService.delete(customerID);
  }

  @Put(':customerID/favorites/:productID')
  setFavorites(
    @Param('customerID', MongoIdPipe) customerID: string,
    @Param('productID', MongoIdPipe) productID: string,
  ) {
    return this.customerService.setFavorite(customerID, productID);
  }

  @Post(':customerID/orders')
  generateOrder(@Param('customerID', MongoIdPipe) customerID: string) {
    return this.customerService.addOrder(customerID);
  }

  @Delete(':customerID/orders/:orderID')
  deleteOrder(
    @Param('customerID', MongoIdPipe) customerID: string,
    @Param('orderID', MongoIdPipe) orderID: string,
  ) {
    return this.customerService.deleteOrder(customerID, orderID);
  }
}
