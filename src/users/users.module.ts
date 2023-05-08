import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { UsersService } from './services/users.service';
import { User, UserSchema } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { CartsModule } from '../carts/carts.module';
import { CartsService } from 'src/carts/services/carts.service';

@Module({
  imports: [
    CartsModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Customer.name,
        imports: [CartsModule],
        useFactory: (cartsService: CartsService) => {
          const schema = CustomerSchema;
          schema.pre('save', async function () {
            if (!this.cartID) {
              const newCart = await cartsService.create();
              this.cartID = newCart._id;
            }
          });
          return schema;
        },
        inject: [CartsService],
      },
    ]),
  ],
  controllers: [CustomersController, UsersController],
  providers: [CustomersService, UsersService],
  exports: [CustomersService, UsersService],
})
export class UsersModule {}
