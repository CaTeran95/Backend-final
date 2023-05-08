import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Address, AddressSchema } from './address.entity';
import { Name, NameSchema } from './name.entity';
import { Product } from 'src/products/entities/product.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { Order } from 'src/carts/entities/order.entity';

export enum Role {
  ADMIN = 'admin',
  STAFF = 'staff',
  CUSTOMER = 'customer',
}

@Schema()
export class Customer extends Document {
  @Prop({ type: NameSchema })
  name: Name;

  @Prop({ required: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true })
  alias: string;
  
  @Prop({ required: true, default: 'customer' })
  role: Role;

  @Prop({ type: Date, required: true })
  birthday: Date;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ type: AddressSchema, required: true })
  address: Address;

  @Prop({ type: Number, required: true })
  personalID: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: Order.name, required: true }] })
  orders: Types.Array<Order>;

  @Prop({ type: Types.ObjectId, ref: Cart.name })
  cartID: Cart | Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
  favorites: Types.Array<Product>;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
