import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Brand, BrandSchema } from 'src/products/entities/brand.entity';
import { Address, AddressSchema } from 'src/users/entities/address.entity';
import { Name, NameSchema } from 'src/users/entities/name.entity';

export enum Status {
  GENERATED = 'generated',
  CONFIRMED = 'confirmed',
  IN_PROCESS = 'in process',
  DELIVERED = 'delivered',
}

@Schema({ _id: false })
class OrderUser extends Document {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: NameSchema })
  name: Name;

  @Prop({ required: true, index: true })
  email: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true })
  alias: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ type: AddressSchema, required: true })
  address: Address;

  @Prop({ type: Number, required: true })
  personalID: number;
}

const OrderUserSchema = SchemaFactory.createForClass(OrderUser);

@Schema({ _id: false })
class ListProduct extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  productID: Types.ObjectId;

  @Prop({ type: [String], required: true })
  images: Types.Array<string>;

  @Prop({ required: true })
  name: string;

  @Prop({ type: BrandSchema, required: true })
  brand: Brand;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  quantity: number;
}

const ListProductSchema = SchemaFactory.createForClass(ListProduct);

@Schema()
export class Order extends Document {
  @Prop({ type: OrderUserSchema, required: true })
  user: OrderUser;

  @Prop({ type: Date, required: true })
  creationDate: Date;

  @Prop({ type: [ListProductSchema], required: true })
  list: ListProduct[];

  @Prop({ type: String, default: Status.GENERATED })
  status: Status;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
