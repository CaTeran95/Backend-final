import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { OrderStatusPipe } from 'src/common/order-status.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/user.entity';
import { Self } from 'src/auth/decorators/self.decorator';

@Controller('api/orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Get()
  getAll() {
    return this.ordersService.findAll();
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Self('orders')
  @Get(':orders')
  getOne(@Param('orders', MongoIdPipe) orderID: string) {
    return this.ordersService.findOne(orderID);
  }

  // @Get('/user/:userID')
  // getUserOrders(@Param('userID', MongoIdPipe) userID: string) {
  //   return this.ordersService.findByUser(userID);
  // }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Roles(Role.ADMIN, Role.STAFF)
  @Put(':orderID/status/:status')
  setStatus(
    @Param('status', OrderStatusPipe) status: string,
    @Param('orderID', MongoIdPipe) orderID: string,
  ) {
    return this.ordersService.updateStatus(orderID, status);
  }
}
