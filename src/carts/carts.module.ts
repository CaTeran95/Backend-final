import { Module } from '@nestjs/common';

import { CartsService } from './services/carts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './entities/cart.entity';
import { CartsController } from './controllers/carts.controller';
import { OrdersService } from './services/orders.service';
import { Order, OrderSchema } from './entities/order.entity';
import { OrdersController } from './controllers/orders.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cart.name,
        schema: CartSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  providers: [CartsService, OrdersService],
  exports: [CartsService, OrdersService],
  controllers: [CartsController, OrdersController],
})
export class CartsModule {}
