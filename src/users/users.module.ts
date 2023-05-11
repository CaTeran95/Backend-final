import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User, UserSchema } from './entities/user.entity';
import { CartsService } from 'src/carts/services/carts.service';
import { CartsModule } from 'src/carts/carts.module';

@Module({
  imports: [
    CartsModule,
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        imports: [CartsModule],
        useFactory: (cartsService: CartsService) => {
          const schema = UserSchema;
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
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
