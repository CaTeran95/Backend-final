import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { OrderStatusPipe } from 'src/common/order-status.pipe';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getAll() {
    return this.ordersService.findAll();
  }

  @Get(':orderID')
  getOne(@Param('orderID', MongoIdPipe) orderID: string) {
    return this.ordersService.findOne(orderID);
  }

  @Get('/customer/:customerID')
  getCustomerOrders(@Param('customerID', MongoIdPipe) customerID: string) {
    return this.ordersService.findByCustomer(customerID);
  }

  @Put(':orderID/status/:status')
  setStatus(
    @Param('status', OrderStatusPipe) status: string,
    @Param('orderID', MongoIdPipe) orderID: string,
  ) {
    return this.ordersService.updateStatus(orderID, status);
  }
}
